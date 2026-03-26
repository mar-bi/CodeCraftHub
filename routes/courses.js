const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");

// Route definitions
router.get("/stats", courseController.getCourseStats);
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);
router.get("/status/:status", courseController.getCoursesByStatus);
router.post("/", courseController.createCourse);
router.put("/:id", courseController.updateCourse);
router.delete("/:id", courseController.deleteCourse);

module.exports = router;
