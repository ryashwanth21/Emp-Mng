import axios from 'axios';
import { useForm } from 'react-hook-form';
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm();
  const [movies, setMovies] = useState([]);
  const [editId, setEditId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/movie');
      setMovies(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Add or Update movie
  const onSubmit = async (data) => {
    const payload = {
      movieName: data.movieName,
      movieBudget: Number(data.movieBudget),
      movieRD: data.movieRD,
    };

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/movie/${editId}`, payload);
        setEditId(null);
      } else {
        await axios.post('http://localhost:5000/movie', payload);
      }
      reset();
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // Edit movie
  const onEdit = (movie) => {
    setEditId(movie._id);
    setValue('movieName', movie.movieName);
    setValue('movieBudget', movie.movieBudget);
    setValue('movieRD', movie.movieRD ? movie.movieRD.substring(0, 10) : '');
  };

  // Delete movie
  const onDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/movie/${id}`);
      fetchMovies();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter movies by search term
  const filteredMovies = movies.filter(movie =>
    movie.movieName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>{editId ? 'Edit Movie' : 'Add Movie'}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="row mb-3">
          <div className="col">
            <input
              type="text"
              placeholder="Enter Movie Name"
              {...register('movieName', { required: true })}
              className="form-control"
            />
            {errors.movieName && <p className="text-danger">Movie name is required</p>}
          </div>
          <div className="col">
            <input
              type="number"
              placeholder="Enter Budget"
              {...register('movieBudget', { required: true })}
              className="form-control"
            />
            {errors.movieBudget && <p className="text-danger">Budget is required</p>}
          </div>
          <div className="col">
            <input
              type="date"
              {...register('movieRD', { required: true })}
              className="form-control"
            />
            {errors.movieRD && <p className="text-danger">Release date is required</p>}
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary">
              {editId ? 'Update' : 'Add'}
            </button>
          </div>
        </div>
      </form>

      <h3>Search Movies</h3>
      <input
        type="text"
        placeholder="Search by movie name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3"
      />

      <h3>Movie List</h3>
      {filteredMovies.length === 0 ? (
        <p>No Movies Found</p>
      ) : (
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>#</th>
              <th>Movie Name</th>
              <th>Budget</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMovies.map((movie, index) => (
              <tr key={movie._id}>
                <td>{index + 1}</td>
                <td>{movie.movieName}</td>
                <td>{movie.movieBudget}</td>
                <td>{movie.movieRD?.substring(0, 10)}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => onEdit(movie)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => onDelete(movie._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
