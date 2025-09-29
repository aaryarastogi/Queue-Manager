import Token from '../models/Tokens.js';
import Queue from '../models/Queue.js';
import { reindexTokens } from '../utils/reindexTokens.js';

export const addToken = async (req, res) => {
  try {
    const { customerName } = req.body;
    const { queueId } = req.params;
    const queue = await Queue.findOne({ _id: queueId, manager: req.user.id });
    if (!queue) return res.status(404).json({ message: 'Queue not found' });

    const lastToken = await Token.findOne({ queue: queueId }).sort({ number: -1 });
    const number = lastToken ? lastToken.number + 1 : 1;

    const lastPos = await Token.findOne({ queue: queueId }).sort({ position: -1 });
    const position = lastPos ? lastPos.position + 1 : 1;

    const token = new Token({ queue: queueId, number, customerName, position });
    await token.save();

    return res.status(200).json(token);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getTokens = async (req, res) => {
  try {
    const { queueId } = req.params;
    const tokens = await Token.find({ queue: queueId }).sort({ position: 1 });
    return res.status(200).json(tokens);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const moveToken = async (req, res) => {
  try {
    const { queueId, tokenId } = req.params;
    const { direction } = req.body; 

    const token = await Token.findById(tokenId);
    if (!token) return res.status(404).json({ message: 'Token not found' });

    const newPos = direction === 'up' ? token.position - 1 : token.position + 1;
    if (newPos < 1) return res.status(400).json({ message: 'Cannot move further' });

    const neighbor = await Token.findOne({ queue: queueId, position: newPos });
    if (neighbor) {
      await Token.updateOne({ _id: neighbor._id }, { position: token.position });
    }
    token.position = newPos;
    await token.save();

    return res.status(200).json({ message: 'Token moved', token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const assignTopToken = async (req, res) => {
  const { queueId } = req.params;
  const { tokenId } = req.body;

  const token = await Token.findById(tokenId);
  if (!token) return res.status(404).json({ message: "Token not found" });
  if (token.status === "cancelled") return res.status(400).json({ message: "Token is cancelled" });

  token.status = "assigned";
  await token.save();

  res.json({ message: "Token assigned successfully" });
};

export const cancelToken = async (req, res) => {
  try {
    const { tokenId } = req.params;
    const token = await Token.findById(tokenId);
    if (!token) return res.status(404).json({ message: 'Token not found' });

    token.status = 'cancelled';
    await token.save();

    // After cancelling, reindex waiting tokens
    await reindexTokens(token.queue);

    return res.status(200).json({ message: 'Token cancelled', token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const reorderTokens = async (req, res) => {
  try {
    const { queueId } = req.params;
    const { tokenIds } = req.body; // new order array

    for (let i = 0; i < tokenIds.length; i++) {
      await Token.findByIdAndUpdate(tokenIds[i], { position: i + 1 });
    }

    return res.status(200).json({ message: "Queue reordered successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};