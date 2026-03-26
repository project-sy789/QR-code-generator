import { useState } from 'react';
import { Copy, ExternalLink, CheckCircle2, ScanLine } from 'lucide-react';
import { motion } from 'framer-motion';

interface ScannerResultPreviewProps {
  scannedResult: string | null;
  onReset: () => void;
}

export default function ScannerResultPreview({ scannedResult, onReset }: ScannerResultPreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (scannedResult) {
      navigator.clipboard.writeText(scannedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isUrl = scannedResult && (scannedResult.startsWith('http://') || scannedResult.startsWith('https://'));

  return (
    <div className="preview-container glass-panel" style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      
      {!scannedResult ? (
        <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
          <ScanLine size={64} style={{ opacity: 0.5, marginBottom: '20px' }} />
          <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>รอการสแกน...</h2>
          <p>นำกล้องไปส่องที่ QR Code หรืออัปโหลดรูปภาพ</p>
          <p>ผลลัพธ์การสแกนจะแสดงขึ้นที่นี่</p>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ width: '100%', maxWidth: '400px', display: 'flex', flexDirection: 'column', gap: '20px' }}
        >
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'var(--primary)', color: '#fff', width: '60px', height: '60px', borderRadius: '50%', marginBottom: '16px' }}>
              <CheckCircle2 size={32} />
            </div>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--text-main)', marginBottom: '8px' }}>สแกนสำเร็จ สำเร็จ!</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>ถอดรหัสข้อมูลจากรูปภาพ QR Code เรียบร้อยแล้ว</p>
          </div>

          <div style={{ 
            background: 'var(--input-bg)', 
            padding: '20px', 
            borderRadius: 'var(--radius-lg)', 
            border: '1px solid var(--border-color)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '8px', fontWeight: 600 }}>ข้อมูลที่อ่านได้ (Raw Data):</p>
            <div style={{ 
              background: 'var(--bg-main)', 
              padding: '16px', 
              borderRadius: 'var(--radius-md)', 
              wordBreak: 'break-all', 
              fontFamily: 'monospace',
              color: 'var(--text-main)',
              fontSize: '1rem',
              lineHeight: '1.5',
              maxHeight: '200px',
              overflowY: 'auto'
            }}>
              {scannedResult}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              className="btn btn-secondary" 
              onClick={handleCopy}
              style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
            >
              {copied ? <CheckCircle2 size={20} color="#10b981" /> : <Copy size={20} />}
              {copied ? 'คัดลอกแล้ว!' : 'คัดลอกข้อมูล'}
            </button>

            {isUrl && (
              <a 
                href={scannedResult} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn" 
                style={{ flex: 1, textDecoration: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                <ExternalLink size={20} />
                เปิดลิงก์เว็บไซต์
              </a>
            )}
          </div>

          <button 
            className="btn" 
            onClick={onReset}
            style={{ width: '100%', padding: '12px', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
          >
            สแกนคิวอาร์โค้ดใหม่ (Scan Again)
          </button>
        </motion.div>
      )}

    </div>
  );
}
