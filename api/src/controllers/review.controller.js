import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const addReview = async (req, res) => {
  const requiredFields = [
    "userId",
    "packageId",
    "rating",
    "comment",
    "created_at",
    "updated_at",
    "likes_count",
    "response",
  ];
  const missingFields = requiredFields.filter((field) => !req.body[field]);
  if (missingFields.length) {
    return res
      .status(400)
      .json({ message: `Missing fields : ${missingFields}` });
  }
  try {
    const newReview = await prisma.review.create({
      data: req.body,
    });
    return res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add Review" });
  } finally {
    await prisma.$disconnect();
  }
};
// assuming that we dont need review by id and dont want to update reviews
export const getReviews = async (req, res) => {
  const { rating, likes_count } = req.body;
  try {
    const getReviews = await prisma.review.findMany({
      ...(rating && { rating }),
      ...(likes_count && { likes_count }),
    });
    return res.status(200).json(getReviews);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to retrieve reviews" });
  } finally {
    await prisma.$disconnect();
  }
};

export const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.review.delete({
      where: { id },
    });
    return res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete review" });
  } finally {
    prisma.$disconnect();
  }
};
