import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BasicTable from './table';
import Button from '@mui/material/Button';

function Liste(props) {
  const [gares, setGares] = useState([]);
  const [depart, setDepart] = useState("");
  const [arrivee, setArrivee] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGares = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/gares');
        setGares(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des gares:', error);
      }
    };

    fetchGares();
  }, []);

  const sendDataToBackend = async (depart, arrivee) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:3000/api/voyages/search', { depart, arrivee });
      setResult(response.data); // Affiche les voyages retournés
    } catch (error) {
      console.log(error);
      
      setError('Erreur lors de la récupération des horaires de voyage.');
    }
    setLoading(false);
};

  return (
    <div className="container">
      <div className="text">Banlieue de Tunis (ligne A)</div>
      <div className="App">
        <h1>{props.title}</h1>
        <div className="form-row">
          <div className="input-data">
            <select value={depart} onChange={e => setDepart(e.target.value)}>
              <option value="">Sélectionnez la gare de départ</option>
              {gares.map((gare, index) => (
                <option key={index} value={gare.nom}>{gare.nom}</option>
              ))}
            </select>
            <div className="underline"></div>
          </div>
        </div>
        <h1>{props.title1}</h1>
        <div className="form-row">
          <div className="input-data">
            <select value={arrivee} onChange={e => setArrivee(e.target.value)}>
              <option value="">Sélectionnez la gare d'arrivée</option>
              {gares.map((gare, index) => (
                <option key={index} value={gare.nom}>{gare.nom}</option>
              ))}
            </select>
            <div className="underline"></div>
          </div>
        </div>
        {depart && arrivee && (
          <p>Vous avez sélectionné la gare de départ : {depart} et la gare d'arrivée : {arrivee}</p>
        )}
        <div className="form-row submit-btn">
          <div className="button">
            <Button variant="contained" onClick={() => sendDataToBackend(depart, arrivee)} disabled={!depart || !arrivee || loading}>
              {loading ? 'Chargement...' : 'Consulte les horaires'}
            </Button>
          </div>
        </div>
      </div>
      {error && <div>Erreur : {error}</div>}
      {result.length > 0 && <div><BasicTable tab={result} /></div>}
    </div>
  );
}

export default Liste;
