import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addTransportation = async (req, res) => {
  const requiredFields = [
    "pnrNumber",
    "company",
    "departure_time",
    "arrival_time",
    "origin",
    "destination",
    "price",
    "availability",
    "created_at",
    "updated_at",
    "baggage_allowance",
    "rating",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing Fields : ${missingFields}` });
  }
  try {
    const newTransportation = await prisma.transportation.create({
      data: req.body,
    });
    return res.status(201).json(newTransportation);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Add Transportation" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getTransportation = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const getTransportation = await prisma.transportation.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(getTransportation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Cant get Transportation with this ID" });
  } finally {
    prisma.$disconnect();
  }
};

export const getTransportations = async (req, res) => {
  const { price, rating } = req.body;

  try {
    const getTransportations = await prisma.transportation.findMany({
      where: {
        ...(price && { price }),
        ...(rating && { rating }),
      },
    });
    return res.status(200).json({ getTransportations });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve Transportations" });
  } finally {
    prisma.$disconnect();
  }
};
export const deleteTransportation = async (req, res) => {
  const { id } = req.params;
  //   console.log(id);
  try {
    const deleteTransportation = await prisma.transportation.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Cant get Transportation with this ID" });
  } finally {
    prisma.$disconnect();
  }
};

export const updateTransportation = async (req, res) => {
  const { id } = req.params;
  const {
    pnrNumber,
    company,
    departure_time,
    arrival_time,
    origin,
    destination,
    price,
    availability,
    created_at,
    updated_at,
    baggage_allowance,
    rating,
  } = req.body;
  try {
    const updateTransportation = await prisma.transportation.update({
      where: {
        id,
      },
      data: {
        pnrNumber,
        company,
        departure_time,
        arrival_time,
        origin,
        destination,
        price,
        availability,
        created_at,
        updated_at,
        baggage_allowance,
        rating,
      },
    });
    return res.status(200).json(updateTransportation);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Cant update Transportation with this ID" });
  } finally {
    prisma.$disconnect();
  }
};
