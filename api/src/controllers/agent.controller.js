import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createAgent = async (req, res) => {
  const requiredFields = [
    "userId",
    "action",
    "timestamp",
    "details",
    "ipAddress",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing Fields : ${missingFields}` });
  }

  //   const { userId, action, timestamp, details, ipAddress } = req.body;

  try {
    const createAgent = await prisma.agent.create({
      data: req.body,
    });
    return res.status(200).json(createAgent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getAgents = async (req, res) => {
  try {
    const agent = await prisma.agent.findMany();
    return res.status(200).json(agent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
export const getAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const getAgent = await prisma.agent.findUnique({ where: { id } });
    return res.status(200).json(getAgent);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
export const deleteAgent = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteAgent = await prisma.agent.delete({ where: { id } });
    return res.status(200).json({ message: "Agent deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  } finally {
    await prisma.$disconnect();
  }
};
