"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const client_1 = require("@prisma/client");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST'],
    },
});
const prisma = new client_1.PrismaClient();
app.use(express_1.default.json());
io.on('connection', (socket) => {
    console.log('A user connected: ' + socket.id);
    socket.on('joinRoom', (_a) => __awaiter(void 0, [_a], void 0, function* ({ doctorId, clientId }) {
        console.log(doctorId, clientId);
        const roomId = `room_${doctorId}_${clientId}`;
        socket.join(roomId);
        console.log(`User ${socket.id} joined room: ${roomId}`);
        try {
            const conversation = yield prisma.conversation.findFirst({
                where: {
                    participants: {
                        every: {
                            userId: {
                                in: [doctorId, clientId]
                            }
                        }
                    }
                },
                include: {
                    messages: true,
                },
            });
            if (conversation) {
                socket.emit('previousMessages', conversation.messages);
            }
            else {
                console.log('No existing conversation found');
            }
        }
        catch (error) {
            console.error('Error fetching previous messages:', error);
        }
    }));
    socket.on('sendMessage', (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const [, doctorId, clientId] = data.roomId.split('_');
            let conversation = yield prisma.conversation.findFirst({
                where: {
                    participants: {
                        every: {
                            userId: {
                                in: [doctorId, clientId]
                            }
                        }
                    }
                },
            });
            if (!conversation) {
                conversation = yield prisma.conversation.create({
                    data: {
                        participants: {
                            create: [
                                { userId: doctorId },
                                { userId: clientId },
                            ],
                        },
                    },
                });
            }
            const newMessage = yield prisma.message.create({
                data: {
                    content: data.message,
                    senderId: data.senderId,
                    conversationId: conversation.id,
                },
            });
            io.to(data.roomId).emit('receiveMessage', newMessage);
            console.log('Message sent:', newMessage);
        }
        catch (error) {
            console.error('Error sending message:', error);
        }
    }));
    socket.on('disconnect', () => {
        console.log('User disconnected: ' + socket.id);
    });
});
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
