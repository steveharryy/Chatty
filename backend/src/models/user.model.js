import mongoose from "mongoose";

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id } = req.params; // receiver id from URL

    // Ensure the ID is valid
    const cleanId = id.trim();
    if (!mongoose.Types.ObjectId.isValid(cleanId)) {
      return res.status(400).json({ error: "Invalid receiver ID" });
    }

    const receiverId = new mongoose.Types.ObjectId(cleanId);
    const senderId = req.user._id;

    let imageUrl;
    if (req.file) {
      const uploadResponse = await cloudinary.uploader.upload(req.file.path);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error in sendMessage controller:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

