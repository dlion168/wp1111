import express from 'express';
import cors from 'cors';
import db from './db.js';
import routes from './routes/index.js';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 4000;
db.connect();
const datb = mongoose.connection 
datb.once("open", async () => {
    console.log("Database Connected.");
   });

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.listen(port, () =>
   console.log(`Example app listening on port ${port}!`),
  );
app.use('/', routes);




