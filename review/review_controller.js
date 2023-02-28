import Course from "../course/course_schema.js";
import createError from "../utils/createError.js";
import Review from "./review_schema.js";

export const createReview = async (req, res, next) => {
  if (req.isTutor)
    return next(createError(403, "Sellers can't create a review!"));

  const newReview = new Review({
    userId: req.userId,
    courseId: req.body.courseId,
    desc: req.body.desc,
    star: req.body.star,
  });

  try {
    const review = await Review.findOne({
      courseId: req.body.courseId,
      userId: req.userId,
    });

    if (review)
      return next(
        createError(403, "You have already created a review for this Course!")
      );

    //TODO: check if the user purchased the Course.

    const savedReview = await newReview.save();

    await Course.findByIdAndUpdate(req.body.courseId, {
      $inc: { totalStars: req.body.star, starNumber: 1 },
    });
    res.status(201).send(savedReview);
  } catch (err) {
    next(err);
  }
};

export const getReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ courseId: req.params.courseId });
    res.status(200).send(reviews);
  } catch (err) {
    next(err);
  }
};
export const deleteReview = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
