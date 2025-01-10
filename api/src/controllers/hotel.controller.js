import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addHotel = async (req, res) => {
  const requiredFields = [
    "name",
    "location",
    "rating",
    "price_per_night",
    "availability",
    "amenities",
    "images",
    "created_at",
    "updated_at",
    "policies",
    "room_types",
    "contact_details",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing Fields : ${missingFields}` });
  }
  try {
    const newHotel = await prisma.hotel.create({
      data: req.body,
    });
    return res.status(201).json(newHotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to Add Hotel" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const getHotel = await prisma.hotel.findUnique({
      where: {
        id,
      },
    });
    return res.status(200).json(getHotel);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Failed to retrieve hotel with this ID" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getHotels = async (req, res) => {
  const { rating, availability, location } = req.body;
  try {
    const getHotels = await prisma.hotel.findMany({
      where: {
        ...(rating && { rating }),
        ...(availability && { availability }),
        ...(location && { location }),
      },
    });
    return res.status(200).json(getHotels);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve Hotels" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteHotel = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteHotel = await prisma.hotel.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({ message: "Hotel with this id is deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete Hotel" });
  } finally {
    await prisma.$disconnect();
  }
};

export const updateHotel = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    location,
    rating,
    price_per_night,
    availability,
    amenities,
    images,
    created_at,
    updated_at,
    policies,
    room_types,
    contact_details,
  } = req.body;
  try {
    const updateHotel = await prisma.hotel.update({
      where: {
        id,
      },
      data: {
        name,
        location,
        rating,
        price_per_night,
        availability,
        amenities,
        images,
        created_at,
        updated_at,
        policies,
        room_types,
        contact_details,
      },
    });
    return res.status(200).json(updateHotel);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cant update Hotel with this ID" });
  } finally {
    await prisma.$disconnect();
  }
};
