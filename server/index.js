import dotenv from "dotenv"
import express from "express";
import mongoose, { connect } from "mongoose";
import cors from "cors";
import connectDB from "./config/db.js";
import { loginHandler, registerHandler } from "./controllers/RegisterLogin.js";
import { auth } from './middleware/auth.js';
import { addQueue, deleteParticularQueue, getAllQueues, getParticularQueue } from "./controllers/Queues.js";
import { addToken, assignTopToken, cancelToken, getTokens, moveToken, reorderTokens } from "./controllers/Tokens.js";
import { getAverageWaitTime, getCurrentLength, getQueueTrends } from "./controllers/Analytics.js";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config();

connectDB();
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

app.post('/register', registerHandler);
app.post("/login", loginHandler);

app.post('/addqueue', auth , addQueue);
app.get('/getAllQueues', auth , getAllQueues);
app.get('/queue/:id' , auth , getParticularQueue);
app.delete('/queue/:id', auth , deleteParticularQueue);

app.post('/:queueId', auth, addToken);
app.get('/:queueId', auth, getTokens);
app.patch('/:queueId/:tokenId/move', auth, moveToken);
app.post('/:queueId/assign', auth, assignTopToken);
app.patch('/:queueId/:tokenId/cancel', auth, cancelToken);
app.post('/reorder/:queueId', reorderTokens);

app.get('/average-wait-time/:queueId', getAverageWaitTime);
app.get('/queue-trends/:queueId', getQueueTrends);
app.get('/current-length/:queueId', getCurrentLength);


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`Server running ${PORT}`));