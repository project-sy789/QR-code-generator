import { useEffect, useRef, useState } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera, RefreshCcw, Image as ImageIcon } from 'lucide-react';

interface ScannerSidebarProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function ScannerSidebar({ onScanSuccess }: ScannerSidebarProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [cameraMode, setCameraMode] = useState<'environment' | 'user'>('environment');
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: false, 
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE],
      videoConstraints: { facingMode: cameraMode }
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scannerRef.current = scanner;

    scanner.render((decodedText) => {
      onScanSuccess(decodedText);
      scanner.pause(true);
    }, () => {});

    // Intelligent DOM Automation Bypass
    const automateCore = () => {
      if (!isMounted) return;
      const readerEl = document.getElementById('reader');
      if (!readerEl) return;

      // Nuke and Replace Ugly Texts
      const walk = document.createTreeWalker(readerEl, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walk.nextNode())) {
        if (node.nodeValue) {
          const val = node.nodeValue.trim();
          if (val.includes("Launching Camera") || val.match(/^Select Camera/)) {
            node.nodeValue = ""; // Nuke loading labels and redundant dropdown tags
          } else if (val === "Scan an Image File") {
            node.nodeValue = "สแกนจากรูปภาพในเครื่อง (Image File)";
          } else if (val === "Scan using camera directly") {
            node.nodeValue = "สลับไปใช้กล้องสแกนสด (Camera Scan)";
          } else if (val === "Or drop an image to scan") {
            node.nodeValue = "หรือลากไฟล์ภาพมาปล่อยที่นี่";
          }
        }
      }

      // Automatically bypass requirement for user clicks
      const permBtn = document.getElementById('html5-qrcode-button-camera-permission');
      if (permBtn && permBtn.style.display !== 'none' && !permBtn.hasAttribute('data-auto-clicked')) {
        permBtn.setAttribute('data-auto-clicked', 'true');
        permBtn.click();
      }

      const startBtn = document.getElementById('html5-qrcode-button-camera-start');
      if (startBtn && startBtn.style.display !== 'none' && !startBtn.hasAttribute('data-auto-clicked')) {
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
    
    // First safely halt the physical driver if it exists
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
    setIsSwapping(true);
    const stopBtn = document.getElementById('html5-qrcode-button-camera-stop');
    if (stopBtn) stopBtn.click(); // Shut down live feed

    // Asynchronously poll for the fallback GUI
    let attempts = 0;
    const poller = setInterval(() => {
      attempts++;
      if (attempts > 50) { clearInterval(poller); setIsSwapping(false); return; }
      
      const swapLink = document.getElementById('reader__dashboard_section_swaplink');
      if (swapLink && swapLink.innerText.includes('Image File')) {
         clearInterval(poller);
         swapLink.click(); // Bridge directly to the native React uploader node
         setIsSwapping(false);
         // Erase cached auto-starts so camera reliably re-boots if they click 'Camera Scan' again
         document.getElementById('html5-qrcode-button-camera-start')?.removeAttribute('data-auto-clicked');
         document.getElementById('html5-qrcode-button-camera-permission')?.removeAttribute('data-auto-clicked');
      } else if (swapLink && swapLink.innerText.includes('Camera Scan')) {
         clearInterval(poller);
         setIsSwapping(false); // They were already browsing files
      }
    }, 50);
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
      
      <style>{`
        /* Nuke ugly OS-level native inputs from HTML5-QRCode */
        #reader__camera_selection { display: none !important; }
        #html5-qrcode-button-camera-stop { display: none !important; }
        #reader__dashboard_section_csr span { display: none !important; }
        #reader { border: none !important; }
        
        /* Format remaining dashboard controls for Image fallback */
        #reader__dashboard_section_csr button, #reader__dashboard_section_swaplink {
          background-color: var(--primary) !important;
          color: white !important;
          border: none !important;
          padding: 8px 16px !important;
          border-radius: var(--radius-md) !important;
          cursor: pointer !important;
          margin: 4px !important;
          font-family: 'Prompt', sans-serif !important;
          text-decoration: none !important;
          display: inline-block !important;
        }
        #reader__dashboard_section_csr button:hover, #reader__dashboard_section_swaplink:hover {
          opacity: 0.9 !important;
        }
        
        /* Spin animation for Swap Camera UX */
        .spin-anim {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
