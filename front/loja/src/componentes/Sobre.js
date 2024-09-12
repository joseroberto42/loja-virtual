import React from 'react';
import './Sobre.css';

const Sobre = () => {
  return (
    <div className="sobre-container">
      <h1>Sobre Nossa Loja</h1>
      <p>
        Bem-vindo à nossa loja! Nós nos dedicamos a oferecer produtos de alta qualidade
        e um serviço excepcional para nossos clientes.
      </p>
      <div className="sobre-section">
        <h2>Missão</h2>
        <p>
          Nossa missão é fornecer produtos incríveis que atendam às necessidades e desejos dos nossos clientes, 
          ao mesmo tempo em que mantemos um compromisso com a sustentabilidade e responsabilidade social.
        </p>
      </div>

      <div className="sobre-section">
        <h2>Visão</h2>
        <p>
          Ser reconhecida como uma das melhores lojas online do mercado, proporcionando uma experiência única e 
          satisfatória para todos os nossos consumidores.
        </p>
      </div>

      <div className="sobre-section">
        <h2>Valores</h2>
        <ul>
          <li>Qualidade</li>
          <li>Inovação</li>
          <li>Compromisso com o cliente</li>
          <li>Sustentabilidade</li>
        </ul>
      </div>
    </div>
  );
};

export default Sobre;
