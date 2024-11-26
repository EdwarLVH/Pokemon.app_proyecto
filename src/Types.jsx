import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Types = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://pokeapi.co/api/v2/type')
      .then((res) => res.json())
      .then((data) => setTypes(data.results))
      .catch((error) => console.error('Error fetching types:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Pokémon Types</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Type Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {types.map((type, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td className="text-capitalize">{type.name}</td>
                <td>
                  <Link to={`/type/${type.name}`} className="btn btn-primary btn-sm">
                    View Pokémon
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Types;
