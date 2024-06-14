import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import WidthFullIcon from '@mui/icons-material/WidthFull';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import giga from './assets/gigatama-tan-2024.png';
import './App.css';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [showCaptureControls, setShowCaptureControls] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'success' | 'failure' | null>(null);
  const [imageStyle, setImageStyle] = useState('');
  const [buttonGroupVisible, setButtonGroupVisible] = useState(true);

  const capture = () => {
    const newImageSrc = webcamRef.current?.getScreenshot();
    if (newImageSrc) {
      setImageSrc(newImageSrc);
      setShowImage(true);
      setShowCaptureControls(false);
    }
  };

  const returnToCapture = () => {
    setShowImage(false);
    setShowCaptureControls(true);
    setSaveStatus(null);
  };

  const downloadImage = () => {
    if (imageSrc) {
      const downloadLink = document.createElement('a');
      downloadLink.href = imageSrc;
      downloadLink.download = 'captured-image.jpeg';
      downloadLink.click();
      setSaveStatus('success');

      setTimeout(() => {
        setSaveStatus(null);
      }, 5000);
    } else {
      setSaveStatus('failure');

      setTimeout(() => {
        setSaveStatus(null);
      }, 5000);
    }
  };

  const handleVerticalClick = () => {
    setImageStyle('-vertical');
  };

  const handleBesideClick = () => {
    setImageStyle('-beside');
  };

  const toggleButtonGroup = () => {
    setButtonGroupVisible((prev) => !prev);
  };

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <img className={`main-image ${imageStyle}`} src={giga} alt="gigatama" />
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        style={{ display: showImage ? 'none' : 'block', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {showImage && imageSrc && (
        <img
          src={imageSrc}
          alt="Captured"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      )}
      {showCaptureControls && (
        <button className='camera-button' onClick={capture}><CameraAltIcon /></button>
      )}

      {showImage && (
        <div className='button-area'>
          <button className='return-button' onClick={returnToCapture}><KeyboardReturnIcon /></button>
          <button className='download-button' onClick={downloadImage}><SaveAltIcon /></button>
        </div>
      )}

      {saveStatus && (
        <div className='save-status'>
          {saveStatus === 'success' ? '保存に成功しました' : '失敗しました'}
        </div>
      )}

      <div className='toggle-button'>
        <button onClick={toggleButtonGroup}>
          {buttonGroupVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      </div>

      {buttonGroupVisible && (
        <div className='button-group'>
          <button className={`vertical-button ${imageStyle === '-vertical' ? '-active' : ''}`} onClick={handleVerticalClick}><WidthNormalIcon /></button>
          <button className={`beside-button ${imageStyle === '-beside' ? '-active' : ''}`} onClick={handleBesideClick}><WidthFullIcon /></button>
        </div>
      )}
    </div>
  );
};

export default App;
