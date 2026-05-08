import User from '../models/temp.js';

export const getMembers = async (
  req,
  res
) => {
  try {
    const members =
      await User.find({
        role: 'member',
      }).select(
        'name email'
      );

    res.status(200).json(members);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};