import Queue from '../models/Queue.js';

export const addQueue = async (req, res) => {
  try {
    const { name } = req.body;
    const queue = new Queue({ name, manager: req.user.id });
    await queue.save();
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getAllQueues = async (req, res) => {
  try {
    const queues = await Queue.find({ manager: req.user.id });
    res.json(queues);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getParticularQueue = async (req, res) => {
  try {
    const queue = await Queue.findOne({ _id: req.params.id, manager: req.user.id });
    if (!queue) return res.status(404).json({ message: 'Queue not found' });
    res.json(queue);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const deleteParticularQueue = async (req, res) => {
  try {
    const queue = await Queue.findOneAndDelete({ _id: req.params.id, manager: req.user.id });
    if (!queue) return res.status(404).json({ message: 'Queue not found' });
    res.json({ message: 'Queue deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}