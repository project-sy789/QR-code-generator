import React, { useState } from 'react';
import Papa from 'papaparse';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import QRCodeStyling from 'qr-code-styling';
import { Upload, FileDown, Loader2, AlertCircle } from 'lucide-react';
import type { QRCodeOptions } from './QRCodePreview';

interface BatchSidebarProps {
  options: QRCodeOptions;
}

export default function BatchSidebar({ options }: BatchSidebarProps) {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<string[][]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (!uploadedFile) return;
    setFile(uploadedFile);
    setError('');
    
    Papa.parse(uploadedFile, {
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data as string[][];
        // filter out completely empty rows
        const validRows = rows.filter(row => row.some(cell => cell.trim() !== ''));
        setData(validRows);
      },
      error: (err: any) => {
        setError('เกิดข้อผิดพลาดในการอ่านไฟล์: ' + err.message);
      }
    });
  };

  const generateZip = async () => {
    if (data.length === 0) return;
    setIsGenerating(true);
    setProgress(0);
    setError('');

    try {
      const zip = new JSZip();
      // Render without forcing 320 size, use the user's defined width/1024
      const qrStyling = new QRCodeStyling({
        ...options,
        width: 1024,
        height: 1024,
      });

      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        let filename = `qr-${i + 1}.png`;
        let qrData = '';

        if (row.length >= 2) {
          filename = `${row[0].replace(/[^a-zA-Z0-9_\u0E00-\u0E7F-]/gi, '_')}.png`;
          qrData = row[1];
        } else {
          qrData = row[0];
        }

        if (!qrData) continue;

        qrStyling.update({ data: qrData });
        const blob = await qrStyling.getRawData('png');
        if (blob) {
          zip.file(filename, blob);
        }
        setProgress(Math.round(((i + 1) / data.length) * 100));

        // Yield to main thread every 5 iterations to prevent UI freeze
        if (i % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 0));
        }
      }

      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const safeName = file ? file.name.replace('.csv', '') : 'qrcodes';
      saveAs(zipBlob, `${safeName}-batch.zip`);
    } catch (err: any) {
      setError('เกิดข้อผิดพลาดในการสร้างไฟล์: ' + err.message);
    } finally {
      setIsGenerating(false);
      setProgress(0);
    }
  };

  return (
    <div className="control-section">
      <h2 className="section-title"><Upload size={20} aria-hidden="true" /> สร้างหลายรูปพร้อมกัน (Batch Generator)</h2>
      
      <div className="form-group" style={{ marginTop: '1.5rem' }}>
        <label className="label" htmlFor="csv-upload">อัปโหลดไฟล์ CSV (1 หรือ 2 คอลัมน์)</label>
        <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px dashed var(--input-border)' }}>
          <input 
            id="csv-upload" 
            type="file" 
            accept=".csv"
            onChange={handleFileUpload} 
            disabled={isGenerating}
            style={{ width: '100%', cursor: 'pointer', color: 'var(--text-main)' }}
          />
          <p style={{ marginTop: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ไฟล์ CSV ที่มีข้อมูลที่ต้องการสร้าง QR Code <br/>
            (คอลัมน์แรก: ชื่อไฟล์ (ไม่บังคับ), คอลัมน์ที่สอง: ข้อมูลลิงก์/ข้อความ)
          </p>
        </div>
      </div>

      {error && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444', background: 'rgba(239, 68, 68, 0.1)', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.9rem' }}>
          <AlertCircle size={18} /> {error}
        </div>
      )}

      {data.length > 0 && (
        <div className="form-group" style={{ background: 'var(--panel-bg)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
          <p style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '0.95rem' }}>พร้อมสร้างคิวอาร์โค้ดจำนวน <strong>{data.length}</strong> รูป</p>
          
          <div style={{ background: 'var(--input-bg)', padding: '10px', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.8rem', overflowX: 'auto' }}>
            <p style={{ color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>ตัวอย่างข้อมูล (3 แถวแรก)</p>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'var(--text-main)' }}>
              <tbody>
                {data.slice(0, 3).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '6px', whiteSpace: 'nowrap' }}>{row[0]}</td>
                    {row.length > 1 && <td style={{ padding: '6px', opacity: 0.8 }}>{row[1]}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '0.8rem', color: 'var(--primary)', marginBottom: '1rem', textAlign: 'center' }}>
            ✨ สไตล์ สีสัน และโลโก้ จะล้อตามการตั้งค่าด้านล่างของคุณ
          </p>

          <button 
            className="btn" 
            onClick={generateZip} 
            disabled={isGenerating}
            style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {isGenerating ? (
              <><Loader2 size={18} style={{ marginRight: '8px', animation: 'spin 1s linear infinite' }} /> กำลังสร้าง... {progress}%</>
            ) : (
              <><FileDown size={18} style={{ marginRight: '8px' }} /> กดดาวน์โหลดไฟล์ ZIP (Generate)</>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
