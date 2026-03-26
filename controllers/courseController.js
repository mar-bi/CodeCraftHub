const { readData, writeData } = require("../utils/fileHandler");

// Valid status values
const VALID_STATUSES = ["Not Started", "In Progress", "Completed"];

// Get all courses
exports.getAllCourses = async (req, res) => {
  try {
    const data = await readData();
    res.status(200).json({
      success: true,
      count: data.courses.length,
      data: data.courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving courses",
      error: error.message,
    });
  }
};

// Get single course by ID
exports.getCourseById = async (req, res) => {
  try {
    const data = await readData();
    const course = data.courses.find((c) => c.id === parseInt(req.params.id));

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      data: course,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving course",
      error: error.message,
    });
  }
};

// Get courses by status
exports.getCoursesByStatus = async (req, res) => {
  try {
    const status = req.params.status;

    // Validate status
    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const data = await readData();
    const filteredCourses = data.courses.filter((c) => c.status === status);

    res.status(200).json({
      success: true,
      count: filteredCourses.length,
      data: filteredCourses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error filtering courses",
      error: error.message,
    });
  }
};

// Create new course
exports.createCourse = async (req, res) => {
  try {
    const { name, description, targetCompletionDate, status } = req.body;

    // Validation
    if (!name || !description || !targetCompletionDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, description, and target completion date",
      });
    }

    // Validate status if provided
    const courseStatus = status || "Not Started";
    if (!VALID_STATUSES.includes(courseStatus)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    const data = await readData();

    // Create new course object
    const newCourse = {
      id: data.lastId + 1,
      name,
      description,
      targetCompletionDate,
      status: courseStatus,
      createdAt: new Date().toISOString(),
    };

    // Add to courses array
    data.courses.push(newCourse);
    data.lastId += 1;

    // Save to file
    await writeData(data);

    res.status(201).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};

// Update course
exports.updateCourse = async (req, res) => {
  try {
    const { name, description, targetCompletionDate, status } = req.body;
    const data = await readData();

    const courseIndex = data.courses.findIndex(
      (c) => c.id === parseInt(req.params.id),
    );

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    // Validate status if provided
    if (status && !VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(", ")}`,
      });
    }

    // Update course (keep existing values if not provided)
    const updatedCourse = {
      ...data.courses[courseIndex],
      name: name || data.courses[courseIndex].name,
      description: description || data.courses[courseIndex].description,
      targetCompletionDate:
        targetCompletionDate || data.courses[courseIndex].targetCompletionDate,
      status: status || data.courses[courseIndex].status,
      updatedAt: new Date().toISOString(),
    };

    data.courses[courseIndex] = updatedCourse;

    await writeData(data);

    res.status(200).json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating course",
      error: error.message,
    });
  }
};

// Delete course
exports.deleteCourse = async (req, res) => {
  try {
    const data = await readData();
    const courseIndex = data.courses.findIndex(
      (c) => c.id === parseInt(req.params.id),
    );

    if (courseIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const deletedCourse = data.courses[courseIndex];
    data.courses.splice(courseIndex, 1);

    await writeData(data);

    res.status(200).json({
      success: true,
      message: "Course deleted successfully",
      data: deletedCourse,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: error.message,
    });
  }
};

// Get course statistics
exports.getCourseStats = async (req, res) => {
  try {
    const data = await readData();
    const courses = data.courses;

    // Calculate statistics
    const stats = {
      totalCourses: courses.length,
      byStatus: {
        "Not Started": courses.filter((c) => c.status === "Not Started").length,
        "In Progress": courses.filter((c) => c.status === "In Progress").length,
        Completed: courses.filter((c) => c.status === "Completed").length,
      },
      completionRate:
        courses.length > 0
          ? (
              (courses.filter((c) => c.status === "Completed").length /
                courses.length) *
              100
            ).toFixed(2) + "%"
          : "0%",
    };

    res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving statistics",
      error: error.message,
    });
  }
};
