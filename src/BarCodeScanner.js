// src/QrScanner.js
import React, { useRef, useEffect, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';

export const BarCodeScanner = () => {
  const videoRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState('');

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    if (scanning) {
      codeReader.decodeFromVideoDevice(null, videoRef.current, (result, err) => {
        if (result) {
          setResult(result.getText());
          setScanning(false);
          codeReader.reset();
        }
        if (err) {
          console.error(err);
        }
      });
    }

    return () => {
      codeReader.reset();
    };
  }, [scanning]);

  const handleStartScanning = () => {
    setScanning(true);
  };

  const handleStopScanning = () => {
    setScanning(false);
  }

  return (
    <div className='flex items-center justify-center flex-col'>
    <div className='flex flex-col space-y-4 mt-14'>
      <h1 className='text-3xl font-bold'>Barcode Scanner</h1>
      <div className='flex items-center justify-center space-x-4'>
      <button onClick={handleStartScanning} className='p-2 bg-black text-white rounded-md'>Start Scanning</button>
      <button onClick={handleStopScanning} className='p-2 bg-black text-white rounded-md'>Stop Scanning</button>
      </div>
      <div>
        {scanning && <video ref={videoRef} style={{ width: '30rem' }} />}
      </div>
    </div>
    <div className='text-xl font-bold mt-[2rem]'>
    Result :
    {result && (
      <div>
        <p>{result}</p>
      </div>
    )}
    </div>
    </div>
  );
};

