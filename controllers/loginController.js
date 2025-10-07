// controllers/loginController.js
const loginModel = require("../models/loginModel");

const login = async (req, res) => {
  const { userName, password } = req.body;

  try {
    const user = await loginModel.findUserByUsername(userName);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.password !== password) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    res.status(200).json({
      message: "Login successful",
      role: user.role,
      firstName: user.firstName,
      inverterAccess:user.inverterAccess
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const addUser = async (req, res) => {
  try {
    const { firstName, inverterAccess, password, role, userName } = req.body;

    if (!firstName || !inverterAccess|| !password || !role || !userName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // ✅ Call model function instead of undefined variable
    const id = await loginModel.addUser({ firstName, inverterAccess, password, role, userName });

    res.status(201).json({ message: "User added successfully", id });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Failed to add user" });
  }
};

module.exports = {
  login,
  addUser,
};
