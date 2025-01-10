import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createPayment = async (req, res) => {
  const requiredFields = [
    "bookingId",
    "userId",
    "amount",
    "payment_method",
    "payment_status",
    "transaction_id",
    "currency",
    "payment_date",
    "created_at",
    "updated_at",
    "refund_status",
    "receipt_url",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing fields : ${missingFields}` });
  }
  try {
    const newPayment = await prisma.payment.create({
      data: req.body,
    });
    return res.status(201).json(newPayment);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create Payment" });
  } finally {
    await prisma.$disconnect();
  }
};
