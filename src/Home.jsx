import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [filteredPokemon, setFilteredPokemon] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/pokemon?limit=1281')
      .then((res) => res.json())
      .then((data) => {
        setAllPokemon(data.results);
        setFilteredPokemon(data.results);
      })
      .catch((error) => console.error('Error fetching Pokémon:', error))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const filtered = allPokemon.filter((poke) =>
      poke.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemon(filtered);
    setCurrentPage(1);
  }, [searchTerm, allPokemon]);

  const displayedPokemon = filteredPokemon.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (direction) => {
    setCurrentPage((prev) => prev + direction);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center">Pokémon List</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control my-4"
      />
      {loading ? <p>Loading...</p> : null}
      <div className="row">
        {displayedPokemon.map((poke, index) => {
          const id = poke.url.split('/').filter(Boolean).pop();
          return (
            <div className="col-md-3 mb-4" key={index}>
              <div className="card">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                  className="card-img-top"
                  alt={poke.name}
                />
                <div className="card-body text-center">
                  <h5 className="card-title text-capitalize">{poke.name}</h5>
                  <Link to={`/details/${id}`} className="btn btn-primary btn-sm">
                    More Info
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="d-flex justify-content-between my-4">
  <button
    onClick={() => handlePageChange(-1)}
    disabled={currentPage === 1}
    className="btn btn-primary" 
  >
    Previous
  </button>
  <button
    onClick={() => handlePageChange(1)}
    disabled={currentPage * itemsPerPage >= filteredPokemon.length}
    className="btn btn-primary" 
  >
    Next
  </button>
</div>
    </div>
  );
};

export default Home;
