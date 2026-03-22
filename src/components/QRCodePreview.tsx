import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, {
  type DotType,
  type CornerSquareType,
  type CornerDotType,
  type ErrorCorrectionLevel,
  type FileExtension
} from 'qr-code-styling';
import { Download, CheckCircle2 } from 'lucide-react';
import thaiQrLogo6 from '../assets/Thai_QR_Payment_Logo/Thai QR/Thai_QR_Payment_Logo-06.png';
import promptPayLogo1 from '../assets/Thai_QR_Payment_Logo/Thai QR/PromptPay1.png';

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
  qrType?: string;
  frameText?: string;
  showBanner?: boolean;
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
      const objUrl = URL.createObjectURL(blob as Blob);
      
      if (options.showBanner) {
        const qrImg = new Image();
        const tqImg = new Image();
        const ppImg = new Image();
        let loaded = 0;
        
        const tryDraw = () => {
          loaded++;
          if (loaded < 3) return;
          URL.revokeObjectURL(objUrl);

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          
          const qrSize = 1024;
          const topBannerHeight = 320;
          const bottomFooterHeight = options.frameText ? 160 : 0;
          
          canvas.width = qrSize;
          canvas.height = qrSize + topBannerHeight + bottomFooterHeight;

          // Fill White Background
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Top Header (Dark Blue)
          ctx.fillStyle = '#103566';
          ctx.fillRect(0, 0, canvas.width, 180);

          // Draw Thai QR Symbol (Q) inside blue banner
          // Original size: 355x261
          ctx.drawImage(tqImg, 180, 40, 136, 100);

          // Top Text THAI QR PAYMENT
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 60px "Helvetica Neue", Helvetica, Arial, sans-serif';
          ctx.textAlign = 'left';
          ctx.fillText('THAI QR PAYMENT', 340, 115);

          // Draw PromptPay Logo inside white subspace
          // Original size: 384x129 (~2.97:1 ratio). Desired height 100 -> width 297.
          ctx.drawImage(ppImg, canvas.width / 2 - 148, 200, 297, 100);

          // QR Code Inner Border
          ctx.strokeStyle = '#e2e8f0';
          ctx.lineWidth = 4;
          ctx.strokeRect(50, topBannerHeight + 50, qrSize - 100, qrSize - 100);

          // Draw QR Code Image
          ctx.drawImage(qrImg, 0, topBannerHeight);

          // Footer Text (Account Name)
          if (options.frameText) {
             ctx.fillStyle = '#103566';
             ctx.font = 'bold 50px "Prompt", sans-serif';
             ctx.textAlign = 'center';
             ctx.fillText('ชื่อบัญชี : ' + options.frameText, canvas.width / 2, topBannerHeight + qrSize + 90);
          }

          canvas.toBlob((compositeBlob) => {
            if (!compositeBlob) return;
            const url = URL.createObjectURL(compositeBlob);
            setImageUrl((prevUrl) => {
              if (prevUrl) URL.revokeObjectURL(prevUrl);
              return url;
            });
          }, 'image/png');
        };

        qrImg.onload = tryDraw;
        tqImg.onload = tryDraw;
        ppImg.onload = tryDraw;
        
        qrImg.src = objUrl;
        tqImg.src = thaiQrLogo6;
        ppImg.src = promptPayLogo1;
      } else {
        setImageUrl((prevUrl) => {
          if (prevUrl) URL.revokeObjectURL(prevUrl);
          return objUrl;
        });
      }
    });

    return () => {
      isMounted = false;
    };
  }, [options]);

  const onDownloadClick = (extension: FileExtension) => {
    if (extension === 'png' || extension === 'jpeg') {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `qr-code-promptpay.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      if (!qrCode.current) return;
      qrCode.current.download({
        extension,
        name: 'qr-code-pro'
      });
    }
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
