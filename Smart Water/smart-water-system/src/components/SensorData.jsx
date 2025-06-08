// src/components/SensorData.jsx
import React from 'react';

const SensorData = () => {
  // Sample sensor data; ideally, this data will come from an API call
  const sensors = [
    { id: 1, type: 'Water Flow Sensor', reading: '12 L/min', location: 'Kitchen' },
    { id: 2, type: 'Leak Sensor', reading: 'Normal', location: 'Basement' },
  ];

  return (
    <div>
      <h2>Sensor Data</h2>
      {sensors.map(sensor => (
        <div key={sensor.id}>
          <h3>{sensor.type}</h3>
          <p><strong>Reading:</strong> {sensor.reading}</p>
          <p><strong>Location:</strong> {sensor.location}</p>
        </div>
      ))}
    </div>
  );
};

export default SensorData;
