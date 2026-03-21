import { useState, useEffect } from 'react';
import './App.css';
import { QrCode, Moon, Sun } from 'lucide-react';
import DataSidebar from './components/DataSidebar';
import StyleSidebar from './components/StyleSidebar';
import QRCodePreview, { type QRCodeOptions } from './components/QRCodePreview';
import { buildQRDataString, type QRDataState } from './utils/qrBuilders';

const DEFAULT_DATA_STATE: QRDataState = {
  type: 'url',
  url: 'https://github.com/project-sy789/QR-code-generator',
  text: '',
  email: { address: '', subject: '', body: '' },
  phone: '',
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  vcard: { firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' }
};

const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  data: 'https://github.com/project-sy789/QR-code-generator',
  width: 340,
  height: 340,
  margin: 10,
  errorCorrectionLevel: 'M',
  dotsOptions: { color: '#000000', type: 'square' },
  backgroundOptions: { color: '#ffffff' },
  cornersSquareOptions: { color: '#000000', type: 'square' },
  cornersDotOptions: { color: '#000000', type: 'square' },
  imageOptions: { crossOrigin: 'anonymous', margin: 10 }
};

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('qr-theme') as 'dark' | 'light') || 'dark';
  });

  const [dataState, setDataState] = useState<QRDataState>(() => {
    const saved = localStorage.getItem('qr-data-state');
    return saved ? JSON.parse(saved) : DEFAULT_DATA_STATE;
  });

  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(() => {
    const saved = localStorage.getItem('qr-options');
    return saved ? JSON.parse(saved) : DEFAULT_QR_OPTIONS;
  });

  // Apply theme to body
  useEffect(() => {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    localStorage.setItem('qr-theme', theme);
  }, [theme]);

  // Sync data to QR string & Local Storage
  useEffect(() => {
    localStorage.setItem('qr-data-state', JSON.stringify(dataState));
    const dataString = buildQRDataString(dataState);
    if (dataString) {
      setQrOptions(prev => ({ ...prev, data: dataString }));
    }
  }, [dataState]);

  // Sync options to Local Storage
  useEffect(() => {
    localStorage.setItem('qr-options', JSON.stringify(qrOptions));
  }, [qrOptions]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      <header className="main-header" style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <QrCode className="header-icon" aria-hidden="true" />
          <h1>โปรแกรมสร้างคิวอาร์โค้ด</h1>
        </div>
        <button 
          className="btn btn-secondary" 
          onClick={toggleTheme} 
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`เปลี่ยนสลับโหมดหน้าจอหลัก`}
          style={{ padding: '10px 14px', borderRadius: 'var(--radius-lg)' }}
        >
          {theme === 'dark' ? <Sun size={20} aria-label="Sun icon" /> : <Moon size={20} aria-label="Moon icon" />}
        </button>
      </header>

      <main className="sidebar glass-panel" aria-label="Controls Sidebar">
        <DataSidebar dataState={dataState} setDataState={setDataState} />
        <StyleSidebar options={qrOptions} setOptions={setQrOptions} />
      </main>

      <aside aria-label="QR Code Preview">
        <QRCodePreview options={qrOptions} />
      </aside>
    </div>
  );
}

export default App;
