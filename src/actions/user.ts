"use server";

import client from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const authenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 403 };

    const userExists = await client.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (userExists) return { status: 200, user: userExists };

    const newUser = await client.user.create({
      data: {
        clerkid: user.id,
        fullname: user.firstName + " " + user.lastName,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: user.firstName + "'s WorkSpace",
            type: "PERSONAL",
          },
        },
      },
      include: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          where: {
            User: {
              clerkid: user.id,
            },
          },
        },
      },
    });

    if (newUser) return { status: 200, user: newUser };

    return { status: 400 };
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};
