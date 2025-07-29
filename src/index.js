import app from './app.js';
import { connectDB } from './db.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;
  
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});