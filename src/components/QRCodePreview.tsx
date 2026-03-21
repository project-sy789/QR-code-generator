import { useEffect, useRef } from 'react';
import QRCodeStyling, {
  type DotType,
  type CornerSquareType,
  type CornerDotType,
  type ErrorCorrectionLevel,
  type FileExtension
} from 'qr-code-styling';
import { Download } from 'lucide-react';

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
  };
}

interface QRCodePreviewProps {
  options: QRCodeOptions;
}

export default function QRCodePreview({ options }: QRCodePreviewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    qrCode.current = new QRCodeStyling(options);
    if (ref.current) {
      ref.current.innerHTML = '';
      qrCode.current.append(ref.current);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!qrCode.current) return;
    qrCode.current.update(options);
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

      <div className="qr-wrapper">
        <div ref={ref} />
      </div>

      <div className="action-buttons glass-panel" style={{ padding: '1rem', borderRadius: '16px' }}>
        <button className="btn" onClick={() => onDownloadClick('png')}>
          <Download size={18} /> Download PNG
        </button>
        <button className="btn btn-secondary" onClick={() => onDownloadClick('svg')}>
          <Download size={18} /> Download SVG
        </button>
      </div>
    </div>
  );
}
