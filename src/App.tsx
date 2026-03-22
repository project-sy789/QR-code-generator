import { useState, useEffect } from 'react';
import './App.css';
import { QrCode, Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import DataSidebar from './components/DataSidebar';
import StyleSidebar from './components/StyleSidebar';
import BatchSidebar from './components/BatchSidebar';
import QRCodePreview, { type QRCodeOptions } from './components/QRCodePreview';
import SEOContent from './components/SEOContent';
import { buildQRDataString, type QRDataState } from './utils/qrBuilders';
import thaiQrLogo from './assets/Thai_QR_Payment_Logo/Thai QR/Thai_QR_Payment_Logo-03.png';

const DEFAULT_DATA_STATE: QRDataState = {
  type: 'url',
  url: 'https://github.com/project-sy789/QR-code-generator',
  text: '',
  email: { address: '', subject: '', body: '' },
  phone: '',
  sms: { phone: '', message: '' },
  wifi: { ssid: '', password: '', encryption: 'WPA', hidden: false },
  vcard: { firstName: '', lastName: '', phone: '', email: '', company: '', title: '', website: '' },
  promptpay: { id: '', amount: '', accountName: '' },
  location: { lat: '', lng: '' },
  crypto: { coin: 'bitcoin', address: '', amount: '' },
  event: { title: '', location: '', start: '', end: '', description: '' }
};

const DEFAULT_QR_OPTIONS: QRCodeOptions = {
  data: 'https://github.com/project-sy789/QR-code-generator',
  width: 1024,
  height: 1024,
  margin: 10,
  errorCorrectionLevel: 'M',
  dotsOptions: { color: '#000000', type: 'square' },
  backgroundOptions: { color: '#ffffff' },
  cornersSquareOptions: { color: '#000000', type: 'square' },
  cornersDotOptions: { color: '#000000', type: 'square' },
  imageOptions: { crossOrigin: 'anonymous', margin: 0, imageSize: 0.25, hideBackgroundDots: false }
};

// Easing definition for an Apple-like smooth spring/ease
const springTransition = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const };

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('qr-theme') as 'dark' | 'light') || 'dark';
  });

  const [appMode, setAppMode] = useState<'single' | 'batch'>('single');

  const [dataState, setDataState] = useState<QRDataState>(() => {
    const saved = localStorage.getItem('qr-data-state-v4');
    return saved ? JSON.parse(saved) : DEFAULT_DATA_STATE;
  });

  const [qrOptions, setQrOptions] = useState<QRCodeOptions>(() => {
    const saved = localStorage.getItem('qr-options-v2');
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
    localStorage.setItem('qr-data-state-v4', JSON.stringify(dataState));
    const dataString = buildQRDataString(dataState);
    if (dataString) {
      setQrOptions(prev => {
        return { 
          ...prev, 
          data: dataString,
          qrType: dataState.type,
          frameText: dataState.promptpay.accountName || undefined,
          showBanner: dataState.type === 'promptpay' ? (dataState.promptpay.showBanner ?? true) : false,
          image: dataState.type === 'promptpay' ? thaiQrLogo : (prev.image === thaiQrLogo ? undefined : prev.image),
          errorCorrectionLevel: dataState.type === 'promptpay' ? 'M' : prev.errorCorrectionLevel
        };
      });
    }
  }, [dataState]);

  // Sync options to Local Storage
  useEffect(() => {
    localStorage.setItem('qr-options-v2', JSON.stringify(qrOptions));
  }, [qrOptions]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="app-container">
      <motion.header 
        className="main-header" 
        style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={springTransition}
      >
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
      </motion.header>

      <motion.main 
        className="sidebar glass-panel" 
        aria-label="Controls Sidebar"
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ ...springTransition, delay: 0.1 }}
      >
        <div style={{ display: 'flex', gap: '8px', background: 'var(--input-bg)', padding: '6px', borderRadius: 'var(--radius-lg)' }}>
          <button 
            className={`btn ${appMode === 'single' ? '' : 'btn-secondary'}`} 
            onClick={() => setAppMode('single')}
            style={{ flex: 1, padding: '10px 8px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', background: appMode === 'single' ? 'var(--primary)' : 'transparent', border: 'none' }}
          >
            สร้างทีละรูป (Single)
          </button>
          <button 
            className={`btn ${appMode === 'batch' ? '' : 'btn-secondary'}`} 
            onClick={() => setAppMode('batch')}
            style={{ flex: 1, padding: '10px 8px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)', background: appMode === 'batch' ? 'var(--primary)' : 'transparent', border: 'none' }}
          >
            สร้างแบบไฟล์ (Batch)
          </button>
        </div>

        {appMode === 'single' ? (
          <DataSidebar dataState={dataState} setDataState={setDataState} />
        ) : (
          <BatchSidebar options={qrOptions} />
        )}
        <StyleSidebar options={qrOptions} setOptions={setQrOptions} />
      </motion.main>

      <motion.aside 
        aria-label="QR Code Preview"
        initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={{ ...springTransition, delay: 0.2 }}
      >
        <QRCodePreview options={qrOptions} />
      </motion.aside>

      <motion.div 
        style={{ gridColumn: '1 / -1' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springTransition, delay: 0.3 }}
      >
        <SEOContent />
      </motion.div>
    </div>
  );
}

export default App;
