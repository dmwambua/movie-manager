import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
import Spinner from "./components/Spinner.jsx";
import MovieCard from "./components/MovieCard.jsx";
import { useDebounce } from "react-use";
import { getTrendingMovies, updateSearchCount } from "./appwrite.js";
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

//const endpoint = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

function App() {
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  // Debounce the search term to avoid too many API calls
  // useDebounce is a custom hook that delays the execution of a function
  // until after a specified delay (in this case, 500ms)
  useDebounce(() => setDebouncedSearchTerm(searchTerm), 500, [searchTerm]);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    try {
      const endpoint = query ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}` : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

      const response = await fetch(endpoint);

        const data = await response.json();
        
        if(data.Response === 'False') {
          setErrorMessage(data.Error || 'Failed to fetch movies');
          setMovies([]);
          return;
        }

        setMovies(data.results || []);

if(query && data.results.length > 0) {
  const movie = data.results[0];
  // Update the search count in Appwrite
          await updateSearchCount(query, movie);
        }

      } catch (error) {
        console.error(`Error Fetching Movies. Please try again later: ${error}`); 
      } finally {
        setIsLoading(false);
      }
      
    };
const loadTrendingMovies = async () => {
  setIsLoading(true);
  setErrorMessage('');
  try {
    const movies = await getTrendingMovies();
setTrendingMovies(movies);
    if (movies.length === 0) {
      setErrorMessage('No trending movies found.');
      return;
    }

    // setTrendingMovies(data.results || []); // This line is redundant and can be removed
  }
  catch (error) {
    console.error(`Error Fetching Trending Movies. Please try again later: ${error}`);
  } finally {
    setIsLoading(false);
  }
};
    useEffect(() => {
      fetchMovies(debouncedSearchTerm);
    }, [debouncedSearchTerm]);
useEffect(() => {
  loadTrendingMovies();
}
, []);

    return (
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero Banner" />
            <h1>
              Dr. W's <span className="text-gradient">Movie</span> Search Engine
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          
<>
{trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index) => (
               <li key={movie.$id}>
                <p>{index + 1}</p>
                <img src={movie.poster_url || '/default-poster.png'} alt={movie.title} />
               </li>
              ))}
            </ul>
          </section>
)}

          <section className="all-movies">
            <h2>All Movies</h2>
          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
            <ul>
              {movies.map((movie) => (
           <MovieCard key={movie.id} movie={movie} />
              ))}
            </ul>
          )}
          </section>
</>
        </div>
      </main>
    );
  }

  export default App;

