import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addPackage = async (req, res) => {
  const requiredFields = [
    "title",
    "description",
    "destination",
    "origin",
    "price_per_person",
    "availability",
    "duration",
    "itinerary",
    "terms_and_conditions",
  ];

  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing fields: ${missingFields}` });
  }

  try {
    const newPackage = await prisma.package.create({
      data: req.body,
    });
    return res.status(201).json(newPackage);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to Add booking" });
  } finally {
    await prisma.$disconnect();
  }
};

export const getPackages = async (req, res) => {
  //  in case of title and destination serching
  const { title, destination } = req.body;

  try {
    const getPackages = await prisma.package.findMany({
      where: {
        ...(destination && { destination }),
        ...(title && { title }),
      },
    });
    return res.status(200).json(getPackages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve packages" });
  } finally {
    prisma.$disconnect();
  }
};

export const getPackage = async (req, res) => {
  const { id } = req.params;
  try {
    const getPackage = await prisma.package.findUnique({
      where: {
        id,
      },
    });
    return res.status(404).json(getPackage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Cant get package with this ID" });
  } finally {
    prisma.$disconnect();
  }
};
export const updatePackage = async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    destination,
    origin,
    price_per_person,
    availability,
    duration,
    images,
    discount,
    itinerary,
    terms_and_conditions,
  } = req.body;
  try {
    const updatePackage = await prisma.package.update({
      where: { id },
      data: {
        title,
        description,
        destination,
        origin,
        price_per_person,
        availability,
        duration,
        images,
        discount,
        itinerary,
        terms_and_conditions,
      },
    });
    return res.status(200).json(updatePackage);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to updated package" });
  } finally {
    prisma.$disconnect();
  }
};

export const deletePackage = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.package.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Package deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete package" });
  } finally {
    prisma.$disconnect();
  }
};
