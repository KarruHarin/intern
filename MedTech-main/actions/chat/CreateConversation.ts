
"use server"
import { db } from "@/lib/db";


async function createConversation(currentUserId, targetUserId) {
    const targetUser = await db.user.findUnique({
      where: { id: targetUserId },
    });
  
    if (!targetUser) {
      throw new Error("Target user does not exist");
    }
  
    const newConversation = await db.conversation.create({
      data: {
        name: `Chat with ${targetUser.name}`,
      },
    });
  
    await db.conversationParticipant.createMany({
      data: [
        {
          userId: currentUserId,
          conversationId: newConversation.id,
        },
        {
          userId: targetUserId,
          conversationId: newConversation.id,
        },
      ],
    });
  
    return newConversation; // Return the newly created conversation
  }
  