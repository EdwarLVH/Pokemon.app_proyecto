import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Details = () => {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemon(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error fetching Pokémon details:', error));
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mt-4">
      <div className="card">
        <img
          src={pokemon.sprites.front_default}
          className="card-img-top img-fluid w-25 mx-auto" // Ajusta el ancho aquí
          alt={pokemon.name}
        />
        <div className="card-body">
          <h5 className="card-title text-capitalize">{pokemon.name}</h5>
          <p className="card-text">Height: {pokemon.height}</p>
          <p className="card-text">Weight: {pokemon.weight}</p>
          <p className="card-text">Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
          <Link to="/" className="btn btn-primary">Back to List</Link>
        </div>
      </div>
    </div>
  );
};

export default Details;