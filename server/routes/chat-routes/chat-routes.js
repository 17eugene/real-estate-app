const router = require("express").Router();
const { authenticate } = require("../../middleware");
const { chatControllers } = require("../../controllers");

router.post("/openChat", authenticate, chatControllers.openChatRoom);
router.post("/sendMessage", chatControllers.createChatMessage);
router.get(
  "/getChatRoom/:ownerId/:listingId",
  authenticate,
  chatControllers.getRelatedChatRoom
);
router.get("/:roomId/getMessages", chatControllers.getChatMessagesHistory);
router.get(
  "/getUserChatRooms/:userId",
  authenticate,
  chatControllers.getUserChatRooms
);

module.exports = router;
