import React, { useState, useEffect } from 'react';
import './App.css';
import useDeviceOrientation from './useDeviceOrientation';

function App() {

  const {
    orientation,
    requestPermission,
    isPermissionGranted,
    isSupported
  } = useDeviceOrientation()


  const boxStyle = {
    transform: `rotateY(${orientation.gamma}deg) rotateX(${orientation.beta}deg)`,
    boxShadow: `${orientation.gamma! / 10}px ${orientation.beta! / 10}px 20px rgba(0, 0, 0, 0.5)`,
  };

  return (
    <div className="App">
      <div className="box" style={boxStyle}></div>
    </div>
  );
}

export default App;