const fs = require("fs").promises;
const path = require("path");

const dataPath = path.join(__dirname, "../data/courses.json");

// Read data from JSON file
const readData = async () => {
  try {
    const data = await fs.readFile(dataPath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or is empty, return default structure
    console.error("Error reading file:", error.message);
    return { courses: [], lastId: 0 };
  }
};

// Write data to JSON file
const writeData = async (data) => {
  try {
    await fs.writeFile(dataPath, JSON.stringify(data, null, 2), "utf8");
    return true;
  } catch (error) {
    console.error("Error writing file:", error.message);
    throw error;
  }
};

module.exports = { readData, writeData };
