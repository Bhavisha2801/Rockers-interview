const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
