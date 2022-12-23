import { v4 as uuidv4 } from 'uuid';
import express from 'express';
import mongoose from 'mongoose';
import WebSocket from 'ws' ;
import mongo from './mongo';
import wsConnect from './wsConnect';
import http from 'http';

mongo.connect();
const app = express()
const server = http.createServer(app)
const wss = new WebSocket.Server({ server })
const db = mongoose.connection
db.once('open', () => {
 console.log("MongoDB connected!");
 wss.on('connection', (ws) => {
   ws.id = uuidv4();
   ws.box = '';
   ws.onmessage = wsConnect.onMessage(ws); 
   console.log(ws.id)
});
});
const PORT = process.env.PORT || 4000;
server.listen(PORT, () => {
   console.log(`Example app listening on port ${PORT}!`) });
