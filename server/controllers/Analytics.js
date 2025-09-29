import Token from "../models/Tokens.js";
import { ObjectId } from "mongodb";

export const getAverageWaitTime = async (req, res) => {
  try {
    const { queueId } = req.params;
    const tokens = await Token.find({ queue: queueId, status: 'served' });

    if (tokens.length === 0) return res.json({ averageWaitTime: 0 });

    const totalWait = tokens.reduce((sum, t) => {
      if (t.assignedAt && t.createdAt) {
        return sum + (t.assignedAt - t.createdAt);
      }
      return sum;
    }, 0);

    const avg = totalWait / tokens.length;
    return res.status(200).json({ averageWaitTime: avg / 1000 }); 
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getQueueTrends = async (req, res) => {
  try {
    const { queueId } = req.params;
    console.log(queueId);
    const tokens = await Token.aggregate([
      { $match: { queue: new ObjectId(queueId , String)} },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return res.status(200).json(tokens);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getCurrentLength = async (req, res) => {
  try {
    const { queueId } = req.params;
    const count = await Token.countDocuments({ queue: queueId, status: 'waiting' });
    return res.status(200).json({ currentLength: count });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};