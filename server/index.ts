import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { PrismaClient, Conversation, Message, ConversationParticipant } from '@prisma/client';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cloudinary from 'cloudinary';
import cors from 'cors';

// Load environment variables
dotenv.config();

const app = express();
const server = http.createServer(app);
const prisma = new PrismaClient();

// Define ConversationType enum to match your Prisma schema
enum ConversationType {
    PRIVATE = 'PRIVATE',
    COMMUNITY = 'COMMUNITY',
}

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    credentials: true,
}));

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

app.use(express.json());

// Configure Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create uploads directory if it doesn't exist
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Configure Multer for disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|pdf/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Error: File upload only supports the following filetypes - ' + filetypes));
        }
    },
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req: Request, res: Response): Promise<void> => {
    if (!req.file) {
        res.status(400).json({ error: 'No file uploaded' });
        return;
    }

    try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
            folder: 'uploads',
        });

        fs.unlinkSync(req.file.path);

        res.json({ filePath: result.secure_url });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'File upload failed' });
    }
});

interface GetSetIdPayload {
    userId: string;
}


// Socket.io connection
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);

    socket.on("getsetId", async ({ userId }: GetSetIdPayload) => {
        try {
            // Find the user by userId
            const user = await prisma.user.findFirst({
                where: {
                    id: userId,
                },
            });
            console.log("user"+user);
            if (user) {
                // Update the user's socket_id
                const updatedUser = await prisma.user.update({
                    where: {
                        id: user.id,
                    },
                    data: {
                        socket_id: socket.id
                    },
                });
    
                console.log("User updated with socket_id:", updatedUser);
            } else {
                console.log("User not found");
                socket.emit("error", { message: "User not found" });
            }
        } catch (error) {
            console.error("Error fetching or updating user:", error);
            socket.emit("error", { message: "Internal server error" });
        }
    });

    socket.on('getSocketIds', async (userIds: string[]) => {
        try {
            const users = await prisma.user.findMany({
                where: {
                    id: {
                        in: userIds
                    }
                },
                select: {
                    id: true,
                    socket_id: true
                }
            });

            const socketIds = users.reduce((acc, user) => {
                if (user.socket_id) {
                    acc[user.id] = user.socket_id;
                }
                return acc;
            }, {} as Record<string, string>);

            socket.emit('socketIds', socketIds);
        } catch (error) {
            console.error('Error fetching socket IDs:', error);
            socket.emit('error', { message: 'Error fetching socket IDs, please try again later.' });
        }
    });

    

    socket.on('videoRoom',async ({ doctorId, clientId }: { doctorId: string; clientId: string })=>{
        if (!doctorId || !clientId) {
            socket.emit('error', { message: 'Invalid room ID format' });
            return;
        }

        const videoRoomId = `video_${doctorId}_${clientId}`;
        socket.join(videoRoomId)
    })
    
    // Joining a private conversation room
    socket.on('joinRoom', async ({ doctorId, clientId }: { doctorId: string; clientId: string }) => {
        if (!doctorId || !clientId) {
            socket.emit('error', { message: 'Invalid room ID format' });
            return;
        }

        const roomId = `room_${doctorId}_${clientId}`;
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);

        try {
            let conversation = await prisma.conversation.findFirst({
                where: {
                    participants: {
                        every: {
                            userId: {
                                in: [doctorId, clientId],
                            },
                        },
                    },
                },
                include: {
                    messages: true,
                    participants: true,
                },
            });

            if (conversation) {
                socket.emit('conversationId',conversation.id)
                socket.emit('previousMessages', conversation.messages);
            } else {
                conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            create: [
                                { userId: doctorId },
                                { userId: clientId },
                            ],
                        },
                    },
                    include: {
                        messages: true,
                        participants: true,
                    },

    })
    socket.emit('conversationId', conversation.id);
    socket.emit('previousMessages', []);
            }
        } catch (error) {
            console.error('Error fetching previous messages:', error);
            socket.emit('error', { message: 'Error fetching messages, please try again later.' });
        }
    });

    // Sending a message
   socket.on('sendMessage', async (data) => {
      console.log("data = ",data)
        try {
            let conversation = await prisma.conversation.findUnique({
                where: { id: data.conversationId },
                include: { participants: true },
            });
            console.log("here", data.roomId)
            let [doctorId,clientId] = data.roomId.split('_')

            if (!conversation) {
                conversation = await prisma.conversation.create({
                    data: {
                        participants: {
                            create: [
                                { userId: doctorId },
                                { userId: clientId },
                            ],
                        },
                        
                    },
                    include: {
                        participants: true, 
                    },
                });
            }
            // Check if it's a community conversation and if the sender is a doctor
            if (conversation?.type === ConversationType.COMMUNITY) {
                const isDoctor = conversation.participants.some((p: ConversationParticipant) => p.userId === data.senderId);
                if (!isDoctor) {
                    socket.emit('error', { message: 'You are not allowed to send messages in this community.' });
                    return;
                }
            }

            const newMessage = await prisma.message.create({
                data: {
                    content: data.message,
                    senderId: data.senderId,
                    conversationId: data.conversationId,
                    filePath: data.filePath,
                    fileName: data.fileName,
                    fileType: data.fileType,
                },
            });
            console.log("room id",data.roomId);
            io.to(data.roomId).emit('receivedMessage', newMessage);
            console.log('Message sent:', newMessage);
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', { message: 'Error sending message, please try again later.' });
        }
    });

    // Handling file upload via Socket.io
    socket.on('fileUpload', async (data: { conversationId: string; senderId: string; filePath: string; fileName: string; fileType: string }) => {
        try {
            const conversation = await prisma.conversation.findUnique({
                where: { id: data.conversationId },
                include: { participants: true },
            });

            if (!conversation) {
                socket.emit('error', { message: 'Conversation not found.' });
                return;
            }

            if (conversation.type === ConversationType.COMMUNITY) {
                const isDoctor = conversation.participants.some((p: ConversationParticipant) => p.userId === data.senderId);
                if (!isDoctor) {
                    socket.emit('error', { message: 'You are not allowed to upload files in this community.' });
                    return;
                }
            }

            const newMessage = await prisma.message.create({
                data: {
                    content: 'File uploaded',
                    senderId: data.senderId,
                    conversationId: data.conversationId,
                    filePath: data.filePath,
                    fileName: data.fileName,
                    fileType: data.fileType,
                },
            });

            io.to(`room_${data.conversationId}`).emit('receiveMessage', newMessage);
            console.log('File uploaded and message sent:', newMessage);
        } catch (error) {
            console.error('Error handling file upload:', error);
            socket.emit('error', { message: 'Error uploading file, please try again later.' });
        }
    });

    // Joining a community
    socket.on('joinCommunity', async ({ conversationId, userId }: { conversationId: string; userId: string }) => {
        const roomId = `community_${conversationId}`;
        socket.join(roomId);
        console.log(`User ${userId} joined community room: ${roomId}`);

        // Fetch previous messages for the conversation
        try {
            const conversation = await prisma.conversation.findUnique({
                where: { id: conversationId },
                include: { messages: true },
            });

            if (conversation) {
                socket.emit('previousMessages', conversation.messages);
            } else {
                socket.emit('error', { message: 'Community not found.' });
            }
        } catch (error) {
            console.error('Error fetching community messages:', error);
            socket.emit('error', { message: 'Error fetching messages, please try again later.' });
        }
    });

    // Creating a community
    socket.on('createCommunity', async ({ doctorIds, patientIds }: { doctorIds: string[]; patientIds: string[] }) => {
        try {
            const community = await prisma.conversation.create({
                data: {
                    type: ConversationType.COMMUNITY,
                    participants: {
                        create: [
                            ...(patientIds ? patientIds.map(patientId => ({ userId: patientId })) : []),
                            ...doctorIds.map(doctorId => ({ userId: doctorId })),
                        ],
                    },
                },
            });

            socket.emit('communityCreated', community);
            console.log('Community created:', community);
        } catch (error) {
            console.error('Error creating community:', error);
            socket.emit('error', { message: 'Error creating community, please try again later.' });
        }
    });


    //connecting to call
    console.log('A user connected');
    socket.emit('me', socket.id);

    socket.on('declineCall', (data) => {
        io.to(data.to).emit('callDeclined');
      });
      
      socket.on('endCall', (data) => {
        io.to(data.to).emit('callEnded');
      });
    
    //call user
    socket.on("callUser",(data)=>{
         io.to(data.userToCall).emit("callUser",{signal: data.signalData , from:data.from , name:data.name});
         console.log("call user backend",data);
         
    })

    //Answer call
    socket.on("answerCall", (data) => {
        console.log("answeing call");
        
		io.to(data.to).emit("callAccepted", data.signal)
	})




    // Disconnect event
    socket.on('disconnect', async() => {
        try {
            const updatedUser = await prisma.user.updateMany({
                where: {
                  socket_id: socket.id, 
                },
                data: {
                  socket_id: null, 
          
                },
            });
            if (updatedUser.count > 0) {
                console.log(`Socket ID ${socket.id} set to null for ${updatedUser.count} user(s).`);
              } else {
                console.log(`No user found with socket ID ${socket.id}`);
              }
            
            
        } catch (error) {
            console.error(`Error setting socket ID to null in the database:`, error);
            
        }
        console.log('User disconnected: ' + socket.id);
        
    });
});

// Start the server
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
