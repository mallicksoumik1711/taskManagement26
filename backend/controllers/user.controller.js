const userSchema = require("../models/users.model");

const getAllUsers = async (req, res) => {
  try {
    const allUsers = await userSchema.find();
    res.status(200).json({ users: allUsers });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching users", error: err.message });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching user", error: err.message });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { name, email, role } = req.body;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const updatedUser = await userSchema.findByIdAndUpdate(
      userId,
      {
        name,
        email,
        role,
      },
      { new: true, runValidators: true }
    );
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await userSchema.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userSchema.findByIdAndDelete(userId);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = {getAllUsers, getUserById, updateUser, deleteUser};
