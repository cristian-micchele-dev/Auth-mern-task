import app from './app.js';
import { connectDB } from './db.js';

 

  
app.listen(process.env.PORT, () => {
  connectDB();
    console.log(`Server running on port ${process.env.PORT}`);
});