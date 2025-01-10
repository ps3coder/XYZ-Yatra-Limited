import { PrismaClient } from "@prisma/client";
import { connect } from "mongoose";
const prisma = new PrismaClient();

export const createBooking = async (req, res) => {
  const requiredFields = [
    "userId",
    "packageId",
    "booking_date",
    "departure_date",
    "return_date",
    "total_amount",
    "number_of_passengers",
    "special_requests",
    "created_at",
    "updated_at",
    "insurance_details",
    "cancellation_policy",
    "promo_code",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing fields : ${missingFields}` });
  }
  try {
    const newBooking = await prisma.booking.create({
      data: {
        ...req.body,
        paymentId: null,
        status: "pending",
        user: {
          connect: {
            id: req.body.userId,
          },
        },
        package: {
          connect: {
            id: req.body.packageId,
          },
        },
        payment: {
          connect: {
            id: req.body.userId, //
          },
        },
      },
    });
    return res.status(201).json(newBooking);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create Booking" });
  } finally {
    await prisma.$disconnect();
  }
};
