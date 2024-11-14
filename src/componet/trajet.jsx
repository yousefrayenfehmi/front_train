import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, DirectionsRenderer, Marker } from '@react-google-maps/api';
import Position from './position de train/position';
import axios from 'axios';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const Trajet = () => {
  const [depart, setDepart] = useState(null);
  const [arrivee, setArrivee] = useState(null);
  const [directions, setDirections] = useState(null);
  const [center, setCenter] = useState({ lat: 36.8450, lng: 10.2188 });  // Définir un centre par défaut
  const location = useLocation();

  useEffect(() => {
    const fetchCoords = async () => {
      const params = queryString.parse(location.search);
      const dep = params.dep;
      const arr = params.arr;

      try {
        // Envoyer une requête POST pour récupérer les coordonnées des gares
        const response = await axios.post('http://localhost:3000/api/points', { dep, arr });
        const f = response.data;

        if (f.deps && f.arrs) {
          const depLat = parseFloat(f.deps.latitude);
          const depLng = parseFloat(f.deps.longitude);
          const arrLat = parseFloat(f.arrs.latitude);
          const arrLng = parseFloat(f.arrs.longitude);

          // Vérifiez si les coordonnées sont des nombres valides avant de les utiliser
          if (!isNaN(depLat) && !isNaN(depLng) && !isNaN(arrLat) && !isNaN(arrLng)) {
            setDepart({ lat: depLat, lng: depLng });
            setArrivee({ lat: arrLat, lng: arrLng });
            setCenter({ lat: depLat, lng: depLng });  // Mettre à jour le centre de la carte
          } else {
            console.error('Coordonnées invalides reçues');
          }
        } else {
          console.error('Coordonnées non valides reçues');
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des coordonnées:', error);
      }
    };

    fetchCoords();
  }, [location.search]);

  const directionsCallback = (response) => {
    if (response !== null) {
      if (response.status === 'OK') {
        setDirections(response);
      } else {
        console.log('Directions request failed:', response);
      }
    }
  };

  const calculateDirections = (directionsService) => {
    if (depart && arrivee) {
      const request = {
        origin: depart,
        destination: arrivee,
        travelMode: 'TRANSIT',
        transitOptions: {
          modes: ['RAIL'],
          routingPreference: 'FEWER_TRANSFERS',
        },
      };
      directionsService.route(request, directionsCallback);
    }
  };

  return (
    <div>
      <div className="container">
        <LoadScript googleMapsApiKey="AIzaSyBBO6pZnGuQZz5KZuW9Yb09aAbiiylBvlc">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={center}  // Utiliser le centre dynamique
            zoom={12}
            onLoad={(map) => calculateDirections(new window.google.maps.DirectionsService())}
          >
            {directions && <DirectionsRenderer directions={directions} />}
            <Position />
            {depart && <Marker position={depart} />}
            {arrivee && <Marker position={arrivee} />}
          </GoogleMap>
        </LoadScript>
      </div>
      <div>
        <Link to="/">
          <Button variant="contained">Retour</Button>
        </Link>
      </div>
    </div>
  );
};

export default Trajet;
