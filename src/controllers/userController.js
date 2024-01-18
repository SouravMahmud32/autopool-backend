// userController.js
import User from '../models/User.js';

const MAX_DOWNLINE = 4; // Maximum users allowed under each parent user

const getParentUsers = async (req, res) => {
  try {
    const parentUsers = await User.find();
    res.status(200).json(parentUsers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const registerUser = async (req, res) => {
  try {
    const { userName, parentUserId } = req.body;

    // Assuming you have a User model with a 'name' field and a 'downline' field
    const user = new User({ name: userName, downline: [] });

    if (parentUserId) {
      const parentUser = await User.findById(parentUserId);
      if (!parentUser) {
        return res.status(400).json({ error: 'Parent user not found.' });
      }

      // Add the new user to the parent's downline
      parentUser.downline.push(user);
      await parentUser.save();

      // Set the parent user for the new user
      user.parentUser = parentUser;
    } else {
      // If no parent user ID is provided, find the user with no parent in the database
      const userWithNoParent = await User.findOne({ parentUser: null });
      if (!userWithNoParent) {
        return res.status(400).json({ error: 'No user with no parent found.' });
      }

      // Add the new user to the user with no parent's downline
      userWithNoParent.downline.push(user);
      await userWithNoParent.save();
    }

    await user.save();

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getParentUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const parentUser = await User.findById(id).populate('downline');
    if (!parentUser) {
      return res.status(404).json({ error: 'Parent user not found.' });
    }

    res.status(200).json(parentUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


export { getParentUsers, registerUser, getParentUserById };
