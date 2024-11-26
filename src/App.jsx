import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './Home';
import Details from './Details';
import Types from './Types';
import TypePage from './TypePage'; // Asegúrate de importar TypePage



const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="types" element={<Types />} />
          <Route path="type/:type" element={<TypePage />} /> {/* Ruta para ver Pokémon por tipo */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;

