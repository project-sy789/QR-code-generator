import { useState, useEffect } from 'react';
import './App.css';
import { QrCode } from 'lucide-react';
import DataSidebar from './components/DataSidebar';
import StyleSidebar from './components/StyleSidebar';
import QRCodePreview, { type QRCodeOptions } from './components/QRCodePreview';
import { buildQRDataString, type QRDataState } from './utils/qrBuilders';

function App() {
  const [dataState, setDataState] = useState<QRDataState>({
    type: 'url',
    url: 'https://github.com/project-sy789/QR-code-generator',
    text: '',
    email: { address: '', subject: '', body: '' },
    phone: '',
    sms: { phone: '', message: '' },
    wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
    vcard: { firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' }
  });

  const [qrOptions, setQrOptions] = useState<QRCodeOptions>({
    data: 'https://github.com/project-sy789/QR-code-generator',
    width: 340,
    height: 340,
    margin: 10,
    errorCorrectionLevel: 'Q',
    dotsOptions: {
      color: '#ffffff',
      type: 'rounded'
    },
    backgroundOptions: {
      color: '#1a1f2b'
    },
    cornersSquareOptions: {
      color: '#6366f1',
      type: 'extra-rounded'
    },
    cornersDotOptions: {
      color: '#ec4899',
      type: 'dot'
    },
    imageOptions: {
      crossOrigin: 'anonymous',
      margin: 10
    }
  });

  // Whenever dataState changes, generate string and update qrOptions.data
  useEffect(() => {
    const dataString = buildQRDataString(dataState);
    if (dataString) {
      setQrOptions(prev => ({ ...prev, data: dataString }));
    }
  }, [dataState]);

  return (
    <div className="app-container">
      <div className="main-header">
        <QrCode className="header-icon" />
        <h1>Antigravity QR Generator</h1>
      </div>

      <div className="sidebar glass-panel">
        <DataSidebar dataState={dataState} setDataState={setDataState} />
        <StyleSidebar options={qrOptions} setOptions={setQrOptions} />
      </div>

      <QRCodePreview options={qrOptions} />
    </div>
  );
}

export default App;
