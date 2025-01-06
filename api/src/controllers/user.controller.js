import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        // password: false,
        role: true,
        phone: true,
        address: true,
        date_of_birth: true,
        profile_picture: true,
        is_verified: true,
        created_at: true,
        updated_at: true,
        emergency_contact: true,
        preferences: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: " Failed to retrieve users" });
  }
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        phone: true,
        address: true,
        date_of_birth: true,
        profile_picture: true,
        is_verified: true,
        created_at: true,
        updated_at: true,
        emergency_contact: true,
        preferences: true,
      },
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve user" });
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  const { password, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized" });
  }

  try {
    let hashedPassword = null;

    if (password) {
      hashedPassword = await bcrypt.hash(password, 12);
    }
    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(hashedPassword && { password: hashedPassword }),
      },
    });
    const { password: _, ...userWithoutPasswords } = updatedUser;
    // console.log(userWithoutPasswords);
    return res.status(200).json(userWithoutPasswords);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "failed to update user" });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  const tokenUserId = req.userId;
  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not authorized" });
  }
  try {
    await prisma.user.delete({
      where: { id },
    });
    return res.status(200).json({ message: "User delete successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete user" });
  }
};
