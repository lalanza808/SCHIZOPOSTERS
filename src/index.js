import React, { useState, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';

import Chevron from './chevron.png';
import './css/normalize.css';
import './css/skeleton.css';
import './css/main.css';

const startToken = 1;
const endToken = 5555;
const url = "https://files.lzahq.tech/schizoposters/";

function getRandomToken() {
  return Math.floor(Math.random() * (endToken - startToken) + startToken)
}

function Metadata(token) {
  fetch(url + 'metadata/' + token.token + '.json')
    .then((res) => res.json())
    .then((data) => console.log(data))
  return (
    <>
    </>
  )
}

function App() {
  const [token, setToken] = useState(() => {
      return localStorage.getItem('token') || 0;
  });

  useEffect(() => {
      localStorage.setItem('token', token);
  }, [token]);

  if (token === 0) {
    setToken(getRandomToken());
  }

  return (
    <div className="container">
      <div className="row">
        <span className="schizoImage">
          <h2>SCHIZOPOSTER #{token}</h2>
          <a href={url + "images/schizoposter_" + token + ".png"} target="_blank" rel="noopener noreferrer">
            <img src={url + "images/schizoposter_" + token + ".resized.png"} alt={"SCHIZOPOSTER " + token} />
          </a>
          <Metadata token={token} />
        </span>
      </div>
      <div className="row">
        {token > startToken && (<img src={Chevron} onClick={() => setToken(Number(token) - 1)} alt="previous token" className="arrow previousToken" />)}
        <input type="number" value={token} step="1" onChange={(v) => setToken(v.target.value)} max={endToken} min={startToken} />
        {token < endToken && (<img src={Chevron} onClick={() => setToken(Number(token) + 1)} alt="next token" className="arrow nextToken" />)}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

