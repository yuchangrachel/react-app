const express = require("express");
const router = express.Router();
const {
  getAllDiaries,
  createDiary,
  getDiaryById,
  updateDiary,
  deleteDiary,
} = require("../controllers/diaryControllers");

const { authPart } = require("../middlewares/authMiddleware");
router.route("/").get(authPart, getAllDiaries);
router.route("/:id").get(getDiaryById);
router.route("/create").post(authPart, createDiary);
router.route("/:id").put(authPart, updateDiary);
router.route("/:id").delete(authPart, deleteDiary);

module.exports = router;
