import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TypePage = () => {
  const { type } = useParams(); // Capturamos el tipo desde la URL
  const [pokemonByType, setPokemonByType] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`https://pokeapi.co/api/v2/type/${type}`)
      .then((res) => res.json())
      .then((data) => {
        // Extraemos solo los datos necesarios
        setPokemonByType(data.pokemon.map((poke) => poke.pokemon));
      })
      .catch((error) => console.error('Error fetching Pokémon by type:', error))
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-capitalize mb-4">Pokémon of Type: {type}</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="row">
          {pokemonByType.map((poke, index) => {
            // Extraemos el ID del Pokémon desde la URL de la API
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
                      View Pokémon
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TypePage;

