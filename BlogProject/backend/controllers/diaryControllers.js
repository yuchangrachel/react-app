const Diary = require("../models/diaryModel");
const asyncHandler = require("express-async-handler");

const getAllDiaries = asyncHandler(async (req, res) => {
  //mongodb query
  const diaries = await Diary.find({ user: req.user._id });
  res.json(diaries);
});

const createDiary = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (title && content && category) {
    const newDiary = new Diary({
      user: req.user._id,
      title,
      content,
      category,
    });

    const createNewDiary = await newDiary.save();
    res.status(201).json(createNewDiary);
  } else {
    res.status(400);
    throw new Error("Must fill in all fields");
  }
});
//it is for edit, so can save exist data first
const getDiaryById = asyncHandler(async (req, res) => {
  const diary = await Diary.findById(req.params.id);

  if (diary) {
    res.json(diary);
  } else {
    res.status(404).json({ message: "Diary not found" });
  }

  res.json(diary);
});

const updateDiary = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;
  const diary = await Diary.findById(req.params.id);
  if (diary.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("No authorized");
  }

  if (diary) {
    diary.title = title;
    diary.content = content;
    diary.category = category;

    const updatedNote = await diary.save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("diary not found");
  }
});

const deleteDiary = asyncHandler(async (req, res) => {
  const diary = await Diary.findById(req.params.id);
  if (diary.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("No authorized");
  }

  if (diary) {
    await diary.remove();
    res.json({ message: "Diary remove" });
  } else {
    res.status(404);
    throw new Error("diary not found");
  }
});
module.exports = {
  getAllDiaries,
  createDiary,
  getDiaryById,
  updateDiary,
  deleteDiary,
};
