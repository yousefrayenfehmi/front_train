import React, { useState, useEffect } from 'react';
import { Marker } from '@react-google-maps/api';

const Position = () => {
  const [trainPosition, setTrainPosition] = useState({ lat: 36.794941, lng: 10.180449 });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTrainCoords = {
        lat: trainPosition.lat + Math.random() * 0.01,
        lng: trainPosition.lng + Math.random() * 0.01
      };
      setTrainPosition(newTrainCoords);
    }, 5000);

    return () => clearInterval(interval);
  }, [trainPosition]);

  return (
    <Marker position={trainPosition} title="Train" />
  );
};

export default Position;
