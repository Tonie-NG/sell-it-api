import createError from "../utils/createError.js";
import Course from "./course_schema.js";

export const createCourse = async (req, res, next) => {
  if (!req.isTutor)
    return next(createError(403, "Only sellers can create a course!"));

  const newCourse = new Course({
    userId: req.userId,
    ...req.body,
  });

  try {
    const savedCourse = await newCourse.save();
    res.status(201).json(savedCourse);
  } catch (err) {
    next(err);
  }
};
export const deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course.userId !== req.userId)
      return next(createError(403, "You can delete only your Course!"));

    await Course.findByIdAndDelete(req.params.id);
    res.status(200).send("Course has been deleted!");
  } catch (err) {
    next(err);
  }
};
export const getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) next(createError(404, "Course not found!"));
    res.status(200).send(course);
  } catch (err) {
    next(err);
  }
};
export const getCourses = async (req, res, next) => {
  const q = req.query;
  const filters = {
    ...(q.userId && { userId: q.userId }),
    ...(q.cat && { cat: q.cat }),
    ...((q.min || q.max) && {
      price: {
        ...(q.min && { $gt: q.min }),
        ...(q.max && { $lt: q.max }),
      },
    }),
    ...(q.search && { title: { $regex: q.search, $options: "i" } }),
  };
  try {
    const courses = await Course.find(filters).sort({ [q.sort]: -1 });
    res.status(200).send(courses);
  } catch (err) {
    next(err);
  }
};
