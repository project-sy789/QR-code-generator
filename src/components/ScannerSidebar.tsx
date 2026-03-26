import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeScanType } from 'html5-qrcode';
import { Camera } from 'lucide-react';

interface ScannerSidebarProps {
  onScanSuccess: (decodedText: string) => void;
}

export default function ScannerSidebar({ onScanSuccess }: ScannerSidebarProps) {
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  useEffect(() => {
    // Initialize Scanner on Mount
    const config = {
      fps: 10,
      qrbox: { width: 250, height: 250 },
      rememberLastUsedCamera: true,
      supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE],
      videoConstraints: { facingMode: "environment" }
    };

    const scanner = new Html5QrcodeScanner("reader", config, false);
    scannerRef.current = scanner;

    scanner.render((decodedText) => {
      onScanSuccess(decodedText);
      // Automatically pause scanner to prevent continuous scanning spam over the result screen
      scanner.pause(true);
    }, () => {
      // Background scan errors (ignored natively)
    });

    // Translation logic to brute-force Thai localization onto standard English UI elements
    const translateUI = () => {
      const texts: Record<string, string> = {
        "Request Camera Permissions": "ขออนุญาตเปิดกล้อง (Camera)",
        "Scan an Image File": "อัปโหลดรูปภาพที่นี่ (Image File)",
        "Scan using camera directly": "สลับไปใช้กล้องสแกน (Camera)",
        "Start Scanning": "เปิดกล้องสแกน (Start)",
        "Stop Scanning": "ปิดกล้องสแกน (Stop)",
        "Or drop an image to scan": "หรือลากไฟล์ภาพลงมาที่นี่"
      };

      const readerElement = document.getElementById('reader');
      if (!readerElement) return;

      const walk = document.createTreeWalker(readerElement, NodeFilter.SHOW_TEXT, null);
      let node;
      while ((node = walk.nextNode())) {
        if (node.nodeValue) {
          const val = node.nodeValue.trim();
          if (texts[val]) {
            node.nodeValue = node.nodeValue.replace(val, texts[val]);
          }
        }
      }
    };

    const observer = new MutationObserver(translateUI);
    const targetNode = document.getElementById('reader');
    if (targetNode) {
      observer.observe(targetNode, { childList: true, subtree: true });
      translateUI(); // Initial translation sweep
    }

    return () => {
      if (observer) observer.disconnect();
      if (scannerRef.current) {
        scannerRef.current.clear().catch(error => {
          console.error("Failed to clear html5QrcodeScanner. ", error);
        });
      }
    };
  }, [onScanSuccess]);

  return (
    <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '8px', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Camera size={24} color="var(--primary)" />
          เครื่องสแกนคิวอาร์ (Scanner)
        </h2>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>อนุญาตให้เข้าถึงกล้องเพื่อสแกน หรืออัปโหลดรูปภาพที่มี QR Code</p>
      </div>

      <div style={{
          background: 'var(--input-bg)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
        }}
      >
        {/* The target Div for html5-qrcode to inject the UI */}
        <div id="reader" style={{ width: '100%', border: 'none' }}></div>
      </div>
      
      {/* CSS Overrides for HTML5 QRCode Library injection */}
      <style>{`
        #reader { border: none !important; }
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
        #reader__camera_selection {
          padding: 8px !important;
          border-radius: var(--radius-md) !important;
          border: 1px solid var(--border-color) !important;
          background: var(--bg-main) !important;
          color: var(--text-main) !important;
          margin-bottom: 10px !important;
          font-family: 'Prompt', sans-serif !important;
          width: 100% !important;
        }
        #reader__dashboard_section_csr span, #reader__dashboard_section_swaplink {
          color: var(--text-main) !important;
          font-family: 'Prompt', sans-serif !important;
        }
        #reader__scan_region {
           background-color: var(--bg-main) !important;
        }
        #reader a { color: var(--primary) !important; }
      `}</style>
    </div>
  );
}
