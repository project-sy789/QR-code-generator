import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType, Html5Qrcode } from 'html5-qrcode';
import { Camera, RefreshCcw, Image as ImageIcon } from 'lucide-react';

interface ScannerSidebarProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function ScannerSidebar({ onScanSuccess }: ScannerSidebarProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [cameraMode, setCameraMode] = useState<'environment' | 'user'>('environment');
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: false, 
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA], // Native GUI only needs to handle Video stream
      videoConstraints: { facingMode: cameraMode }
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scannerRef.current = scanner;

    scanner.render((decodedText) => {
      onScanSuccess(decodedText);
      scanner.pause(true);
    }, () => {});

    // Intelligent DOM Automation Bypass - Directly executes hidden buttons
    const automateCore = () => {
      if (!isMounted) return;

      // Automatically bypass requirement for user clicks
      const permBtn = document.getElementById('html5-qrcode-button-camera-permission');
      if (permBtn && !permBtn.hasAttribute('data-auto-clicked')) {
        permBtn.setAttribute('data-auto-clicked', 'true');
        permBtn.click();
      }

      const startBtn = document.getElementById('html5-qrcode-button-camera-start');
      if (startBtn && !startBtn.hasAttribute('data-auto-clicked')) {
        startBtn.setAttribute('data-auto-clicked', 'true');
        setTimeout(() => { if (isMounted) startBtn.click(); }, 300);
      }
    };

    const observer = new MutationObserver(automateCore);
    const targetNode = document.getElementById('reader');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
      automateCore();
    }

    return () => {
      isMounted = false;
      observer.disconnect();
      if (scannerRef.current) {
        scannerRef.current.clear().catch(console.error);
        scannerRef.current = null;
      }
    };
  }, [onScanSuccess, cameraMode]);

  const handleSwapCamera = async () => {
    if (isSwapping) return;
    setIsSwapping(true);
    
    if (scannerRef.current) {
      try {
        await scannerRef.current.clear();
      } catch (e) {
        console.error("Safeshutdown error", e);
      }
    }
    
    setCameraMode(prev => prev === 'environment' ? 'user' : 'environment');
    setTimeout(() => setIsSwapping(false), 500);
  };

  const handleUploadTrigger = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Spawns OS Native File Browser silently
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const html5QrCode = new Html5Qrcode("fast-file-reader");
      const text = await html5QrCode.scanFile(file, true);
      onScanSuccess(text);
      
      html5QrCode.clear();
    } catch (err) {
      alert("ไม่พบรหัส QR Code ในรูปภาพนี้ กรุณาลองใหม่ (No QR Code found)");
      console.warn("File Decode Fallback Failed", err);
    }
    
    // Reset file string to allow identical payload resubmissions
    e.target.value = '';
  };

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Camera size={24} color="var(--primary)" />
          เครื่องสแกนคิวอาร์ (Scanner)
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>หันกล้องเพื่อให้ระบบถอดรหัสอัตโนมัติ</p>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          className="btn" 
          onClick={handleSwapCamera}
          disabled={isSwapping}
          style={{ flex: 1, padding: '12px', background: 'var(--input-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: isSwapping ? 'not-allowed' : 'pointer' }}
        >
          <RefreshCcw size={18} className={isSwapping ? "spin-anim" : ""} />
          {isSwapping ? 'รอสักครู่...' : `กล้อง${cameraMode === 'environment' ? 'หน้า' : 'หลัง'}`}
        </button>

        <button 
          className="btn btn-secondary" 
          onClick={handleUploadTrigger}
          disabled={isSwapping}
          style={{ flex: 1, padding: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: isSwapping ? 'not-allowed' : 'pointer' }}
        >
          <ImageIcon size={18} />
          อัปโหลดรูป
        </button>
      </div>

      <div style={{
          background: 'var(--input-bg)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        <div id="reader" style={{ width: '100%', border: 'none' }}></div>
      </div>
      
      {/* Invisible anchor target for standalone image array decoder */}
      <div id="fast-file-reader" style={{ position: 'absolute', visibility: 'hidden', width: '10px', height: '10px' }}></div>
      <input 
         type="file" 
         accept="image/*" 
         ref={fileInputRef} 
         style={{ display: 'none' }} 
         onChange={handleFileUpload} 
      />
      
      <style>{`
        /* Eradicate everything but the raw video viewer generated by HTML5-QRCode */
        #reader__dashboard_section_csr { display: none !important; }
        
        #reader { border: none !important; }
        
        /* Spin animation for Swap Camera UX */
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
