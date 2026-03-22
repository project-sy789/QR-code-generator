import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
  type DotType,
  type CornerSquareType,
  type CornerDotType,
  type ErrorCorrectionLevel,
  type FileExtension
} from 'qr-code-styling';
import { Download, CheckCircle2 } from 'lucide-react';

export interface QRCodeOptions {
  data: string;
  width: number;
  height: number;
  margin: number;
  image?: string;
  errorCorrectionLevel: ErrorCorrectionLevel;
  dotsOptions: {
    color: string;
    type: DotType;
    gradient?: any;
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
    gradient?: any;
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
    gradient?: any;
  };
  imageOptions: {
    crossOrigin: string;
    margin: number;
    imageSize?: number;
  };
}

interface QRCodePreviewProps {
  options: QRCodeOptions;
}

export default function QRCodePreview({ options }: QRCodePreviewProps) {
  const [imageUrl, setImageUrl] = useState<string>('');
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling({
      ...options,
      qrOptions: { errorCorrectionLevel: options.errorCorrectionLevel },
      width: 1024,
      height: 1024,
      type: 'canvas'
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      ...options,
      qrOptions: { errorCorrectionLevel: options.errorCorrectionLevel },
      width: 1024,
      height: 1024,
    });
    
    let isMounted = true;
    qrCode.current.getRawData('png').then((blob) => {
      if (!isMounted || !blob) return;
      const url = URL.createObjectURL(blob as Blob);
      setImageUrl((prevUrl) => {
        if (prevUrl) URL.revokeObjectURL(prevUrl);
        return url;
      });
    });

    return () => {
      isMounted = false;
    };
  }, [options]);

  const onDownloadClick = (extension: FileExtension) => {
    if (!qrCode.current) return;
    qrCode.current.download({
      extension,
      name: 'qr-code-pro'
    });
  };

  return (
    <div className="preview-area">
      <div className="bg-orb bg-orb-1"></div>
      <div className="bg-orb bg-orb-2"></div>

      <div className="qr-wrapper" aria-label="QR Code Output" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        {imageUrl ? (
          <img src={imageUrl} alt="QR Code" style={{ width: '100%', maxWidth: '380px', maxHeight: '380px', objectFit: 'contain', display: 'block', borderRadius: '10px', boxShadow: '0 8px 32px rgba(0,0,0,0.1)' }} draggable="true" />
        ) : (
          <div style={{ color: 'var(--text-muted)' }}>กำลังสร้าง QR Code...</div>
        )}
      </div>

      <div className="action-buttons glass-panel" style={{ padding: '1rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', textAlign: 'center', color: 'var(--text-main)' }}>
          <CheckCircle2 color="#10b981" size={18} style={{ verticalAlign: 'middle', marginRight: '6px' }} />
          พร้อมดาวน์โหลด
        </h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button className="btn" onClick={() => onDownloadClick('png')}>
            <Download size={18} aria-hidden="true" /> โหลด PNG
          </button>
          <button className="btn btn-secondary" onClick={() => onDownloadClick('svg')}>
            <Download size={18} aria-hidden="true" /> โหลด SVG
          </button>
        </div>
      </div>
    </div>
  );
}
