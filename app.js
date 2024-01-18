// app.js
import express from 'express';
import dotenv from 'dotenv';

import { json } from 'express';
import cors from 'cors';
import connectDB from './src/db/index.js';
import { getParentUsers, registerUser, getParentUserById } from './src/controllers/userController.js';

dotenv.config()

const app = express();

connectDB();

app.use(json());
app.use(cors());

app.post('/api/register', registerUser);
app.get('/api/parentUsers', getParentUsers);
app.get('/api/parentUsers/:id', getParentUserById);


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
