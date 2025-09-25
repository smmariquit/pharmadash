import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";
import prisma from "@/prisma/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const event = await verifyWebhook(req);
    const { id } = event.data;
    const eventType = event.type;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`,
    );

    if (eventType === "user.created") {
      const { id, email_addresses, first_name, last_name } = event.data;

      await prisma.user.upsert({
        where: { clerkId: id },
        update: {},
        create: {
          clerkId: id,
          email: email_addresses[0].email_address,
          name: `${first_name} ${last_name}`,
        },
      });
    }

    return new Response("Webhook received:", { status: 200 });
  } catch (error) {
    console.error("Error verifying webhook:", error);
    return new Response("Error verifying webhook:", { status: 400 });
  }
}
