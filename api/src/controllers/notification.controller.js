import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addNotification = async (req, res) => {
  const requiredFields = ["userId", "message", "type", "is_read", "created_at"];
  const missingFields = requiredFields.filter((field) => !req.body[field]);

  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing Fields : ${missingFields}` });
  }
  try {
    const addNotification = await prisma.notification.create({
      data: req.body,
    });
    return res.status(201).json(addNotification);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Add Notification" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getNotifications = async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany();
    return res.status(200).json(notifications);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve notifications" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteNotification = await prisma.notification.delete({
      where: {
        id,
      },
    });
    return res
      .status(200)
      .json({ message: "Notification with this id is deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete Notification" });
  } finally {
    await prisma.$disconnect();
  }
};
