const mongoose=require('mongoose');
const express=require('express');
const cors=require('cors');


const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/MoviesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.error('❌ MongoDB Error:', err));

// Schema & Model
const movieSchema = new mongoose.Schema({
  movieName: String,
  movieBudget: Number,
  movieRD: String,
});

const Movie = mongoose.model('Movie', movieSchema);

// Routes
app.get('/movie', async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

app.post('/movie', async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

app.put('/movie/:id', async (req, res) => {
  await Movie.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Movie Updated' });
});

app.delete('/movie/:id', async (req, res) => {
  await Movie.findByIdAndDelete(req.params.id);
  res.json({ message: 'Movie Deleted' });
});

// Server start
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});
