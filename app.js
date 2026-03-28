const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courses");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Logging middleware (for learning purposes)
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Enable CORS for all routes (to run FE dashboard from a different origin)
app.use(cors());

// Routes
app.use("/api/courses", courseRoutes);

// Welcome route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to CodeCraftHub API",
    version: "1.0.0",
    endpoints: {
      courses: "/api/courses",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
    error: err.message,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 CodeCraftHub is running on http://localhost:${PORT}`);
  console.log(`📚 API available at http://localhost:${PORT}/api/courses`);
});
