import React from 'react';
import Navbar from '../../componentes/navbar.js'; // Importando o componente Navbar

import Cards from '../../componentes/cards.js';
import ProductList from '../../componentes/ProductList.js';

const Home = () => {
  return (
    <div>
      <Navbar /> {/* Navbar aparece no topo da página */}
      <main>
        <h1>Bem-vindo à nossa Loja Online!</h1>
        <p>Explore nossos produtos e aproveite as ofertas!</p>
      </main>
      
      <ProductList></ProductList>
      

    </div>
  );
};

export default Home;
