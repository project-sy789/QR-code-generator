import { useEffect, useRef } from 'react';
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
  };
  backgroundOptions: {
    color: string;
  };
  cornersSquareOptions: {
    color: string;
    type: CornerSquareType;
  };
  cornersDotOptions: {
    color: string;
    type: CornerDotType;
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
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    // Re-instantiate when first loaded to prevent double render issue on react strict mode
    qrCode.current = new QRCodeStyling({
      ...options,
      width: 1024,
      height: 1024,
    });
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update({
      ...options,
      width: 1024,
      height: 1024,
    });
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

      <div className="qr-wrapper" aria-label="QR Code Output">
        <div ref={ref} />
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
