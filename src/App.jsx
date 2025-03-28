
import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";
const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

const endpoint = `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  
  const [isLoading, setIsLoading] = useState(true);
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

      } catch (error) {
        console.error(`Error Fetching Movies. Please try again later: ${error}`); 
      } finally {
        setIsLoading(true);
      }
      
    };

    useEffect(() => {
      fetchMovies();
    }, []);

    return (
      <main>
        <div className="pattern" />

        <div className="wrapper">
          <header>
            <img src="./hero-img.png" alt="Hero Banner" />
            <h1>
              Find <span className="text-gradient">Movies</span> You Will Enjoy
              Without Struggling
            </h1>
            <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          </header>
          <section className="all-movies">
            <h2>All Movies</h2>
          {isLoading ? (<p className="text-white">Loading...</p>
          ) : errorMessage ? (
          <p className="text-red-500">{errorMessage}</p>
        ) : (
            <ul>
              {movies.map((movie) => (
                <p key={movie.id} className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}
          </section>
        </div>
      </main>
    );
  }

  export default App;



/*
import React, { useState, useEffect } from "react";
import Search from "./components/Search.jsx";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');

    if (!API_KEY) {
      console.error('API key is undefined or empty');
      setErrorMessage('API key is not set');
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = query
        ? `${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&api_key=${API_KEY}`
        : `${API_BASE_URL}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

      console.log(`Fetching from endpoint: ${endpoint}`);

      const response = await fetch(endpoint);

      if (!response.ok) {
        const errorData = await response.json();
        console.error(`Failed to fetch movies. Status code: ${response.status}. Error message: ${errorData.status_message}`);
        throw new Error(`Failed to fetch movies. Status code: ${response.status}. Error message: ${errorData.status_message}`);
      }

      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    } catch (error) {
      console.error(`Error Fetching Movies: ${error.message}`);
      setErrorMessage('Failed to fetch movies. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Call fetchMovies when searchTerm changes
  useEffect(() => {
    if (searchTerm) {
      fetchMovies(searchTerm);
    } else {
      fetchMovies();
    }
  }, [searchTerm]);

  return (
    <main>
      <div className="pattern" />
      
      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You Will Enjoy
            Without a Sweat
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        
        <section className="all-movies"> 
          <h2>All Movies</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movies.map((movie) => (
                <li key={movie.id}>{movie.title}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
*/