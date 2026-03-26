const fs = require("fs").promises;
const path = require("path");

const sampleCourses = {
  courses: [
    {
      id: 1,
      name: "Node.js Masterclass",
      description: "Complete Node.js guide from beginner to advanced",
      targetCompletionDate: "2024-03-15",
      status: "Completed",
      createdAt: "2024-01-01T10:00:00.000Z",
      updatedAt: "2024-01-20T15:30:00.000Z",
    },
    {
      id: 2,
      name: "React Complete Guide",
      description: "Build modern web applications with React",
      targetCompletionDate: "2024-04-30",
      status: "In Progress",
      createdAt: "2024-01-05T14:20:00.000Z",
    },
    {
      id: 3,
      name: "Python for Data Science",
      description: "Learn Python for data analysis and ML",
      targetCompletionDate: "2024-05-20",
      status: "In Progress",
      createdAt: "2024-01-10T09:15:00.000Z",
    },
    {
      id: 4,
      name: "Docker & Kubernetes",
      description: "Master containerization and orchestration",
      targetCompletionDate: "2024-06-10",
      status: "Not Started",
      createdAt: "2024-01-12T11:45:00.000Z",
    },
    {
      id: 5,
      name: "GraphQL Fundamentals",
      description: "Modern API development with GraphQL",
      targetCompletionDate: "2024-07-01",
      status: "Not Started",
      createdAt: "2024-01-15T16:00:00.000Z",
    },
    {
      id: 6,
      name: "AWS Cloud Practitioner",
      description: "Introduction to Amazon Web Services",
      targetCompletionDate: "2024-08-15",
      status: "Not Started",
      createdAt: "2024-01-18T13:30:00.000Z",
    },
    {
      id: 7,
      name: "TypeScript Deep Dive",
      description: "Advanced TypeScript patterns and practices",
      targetCompletionDate: "2024-02-28",
      status: "In Progress",
      createdAt: "2024-01-20T10:20:00.000Z",
    },
    {
      id: 8,
      name: "MongoDB Essentials",
      description: "NoSQL database development with MongoDB",
      targetCompletionDate: "2024-02-10",
      status: "Completed",
      createdAt: "2024-01-02T08:00:00.000Z",
      updatedAt: "2024-01-25T14:15:00.000Z",
    },
  ],
  lastId: 8,
};

async function seedData() {
  try {
    const dataPath = path.join(__dirname, "../data/courses.json");
    await fs.writeFile(dataPath, JSON.stringify(sampleCourses, null, 2));
    console.log("✅ Sample data created successfully!");
    console.log(`📊 Added ${sampleCourses.courses.length} courses`);
  } catch (error) {
    console.error("❌ Error creating sample data:", error);
  }
}

seedData();
