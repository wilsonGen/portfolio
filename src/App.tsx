import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [rotation, setRotation] = useState({ alpha: 0, beta: 0, gamma: 0 });

  useEffect(() => {
    const handleOrientation = (event:DeviceOrientationEvent) => {
      setRotation({
        alpha: event.alpha!,
        beta: event.beta!,
        gamma: event.gamma!,
      });
    };

    const requestPermission = async () => {
      try {
        //@ts-ignore
        if (typeof DeviceOrientationEvent.requestPermission === 'function') {
        //@ts-ignore
          const response = await DeviceOrientationEvent.requestPermission();
          if (response === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } else {
          // For non-iOS devices
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
        }
      } catch (error) {
        console.error('Permission denied', error);
      }
    };

    requestPermission();

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  const boxStyle = {
    transform: `rotateY(${rotation.gamma}deg) rotateX(${rotation.beta}deg)`,
    boxShadow: `${rotation.gamma / 10}px ${rotation.beta / 10}px 20px rgba(0, 0, 0, 0.5)`,
  };

  return (
    <div className="App">
      <div className="box" style={boxStyle}></div>
    </div>
  );
}

export default App;