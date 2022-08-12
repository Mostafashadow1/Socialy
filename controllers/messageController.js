import chatSchema from "../models/ChatModel.js";
import messageSchema from "../models/messageModel.js";
import { APIPagination } from "../pagination.js";

export const messageController = {
  // Create A Message
  async createMessage(req, res) {
    try {
      const { recipient, messageText, media } = req.body;
      if (!recipient || (!messageText.trim() && media.length === 0)) return;

      const newChat = await chatSchema.findOneAndUpdate(
        {
          $or: [
            { recipients: [req.user._id, recipient] },
            { recipients: [recipient, req.user._id] },
          ],
        },
        {
          recipients: [req.user._id, recipient],
          messageText,
          media,
        },
        { new: true, upsert: true }
      );
      const newMessage = new messageSchema({
        chat: newChat._id,
        sender: req.user._id,
        recipient,
        messageText,
        media,
      });
      await newMessage.save();
      res.json({ msg: "create Succuss" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // Get Chats
  async getChats(req, res) {
    try {
      const chatsPagination = new APIPagination(
        chatSchema.find({
          recipients: req.user._id,
        }),
        req.query
      ).pagination();
      const chats = await chatsPagination.query
        .sort("-updatedAt")
        .populate("recipients", "avatar username");
      res.json({ chats, chatsCount: chats.length });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Get Messages
  async getMessages(req, res) {
    try {
      const messagesPagination = new APIPagination(
        messageSchema.find({
          $or: [
            { sender: req.user._id, recipient: req.params.id },
            { sender: req.params.id, recipient: req.user._id },
          ],
        }),
        req.query
      ).pagination();
      const messages = await messagesPagination.query.sort("-createdAt");
      res.json({ messages, messagesCount: messages.length });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Delete Message
  async deleteMessage(req, res) {
    try {
      await messageSchema.findOneAndDelete({
        _id: req.params.id,
        sender: req.user._id,
      });

      res.json({ msg: "Delete Success !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // Delete Chat
  async deleteChat(req, res) {
    try {
      const chat = await chatSchema.findOneAndDelete({
        $or: [
          { recipients: [req.user._id, req.params.id] },
          { recipients: [req.params.id, req.user._id] },
        ],
      });
      const deleteMessages = await messageSchema.deleteMany({ chat: chat.id });
      res.json({ msg: "Delete Success !" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
