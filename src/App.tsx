import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import './App.css';

const App: React.FC = () => {
  const webcamRef = useRef<Webcam>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showImage, setShowImage] = useState(false);
  const [showCaptureControls, setShowCaptureControls] = useState(true);
  const [saveStatus, setSaveStatus] = useState<'success' | 'failure' | null>(null);

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
    setSaveStatus(null); // 画像を撮り直す時に保存ステータスもリセットする
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

  return (
    <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
    </div>
  );
};

export default App;
