"use server";

import { prisma } from "@/utils/prisma";

export const deleteCompletedTasks = async () => {
  try {
    const deleteTasks = await prisma.tasks.deleteMany({
      where: {
        done: true,
      },
    });

    return deleteTasks;
  } catch (error) {
    throw error;
  }
};
