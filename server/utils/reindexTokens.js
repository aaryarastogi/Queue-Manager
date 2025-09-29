import Token from "../models/Tokens.js";

export const reindexTokens = async(queueId)=>{
  const tokens = await Token.find({ queue: queueId, status: 'waiting' }).sort({ position: 1 });

  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].position !== i + 1) {
      tokens[i].position = i + 1;
      await tokens[i].save();
    }
  }
}