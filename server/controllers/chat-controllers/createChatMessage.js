const { ChatMessage } = require("../../models");
const { io } = require("../../server");

const createChatMessage = async (req, res, next) => {
  try {
    const message = await ChatMessage.create(req.body);

    io.to(req.body.room).emit("receive-message", message);

    res.status(200).json({
      message: "Chat message successfully created",
      code: 201,
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = createChatMessage;
