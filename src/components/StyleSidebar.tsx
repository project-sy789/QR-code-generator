import React from 'react';
import { Palette, Grid, Image as ImageIcon, Zap } from 'lucide-react';
import type { QRCodeOptions } from './QRCodePreview';

interface StyleSidebarProps {
  options: QRCodeOptions;
  setOptions: React.Dispatch<React.SetStateAction<QRCodeOptions>>;
}

export default function StyleSidebar({ options, setOptions }: StyleSidebarProps) {
  const handleColorChange = (path: string[], value: string) => {
    setOptions(prev => {
      const newOpts = JSON.parse(JSON.stringify(prev));
      let current: any = newOpts;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      newOpts.image = prev.image; 
      return newOpts;
    });
  };

  const handleTypeChange = (path: string[], value: any) => {
    setOptions(prev => {
      const newOpts = JSON.parse(JSON.stringify(prev));
      let current: any = newOpts;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      newOpts.image = prev.image;
      return newOpts;
    });
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions(prev => ({ ...prev, image: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearLogo = () => {
    setOptions(prev => ({ ...prev, image: undefined }));
  };

  const applyPreset = (preset: 'cyberpunk' | 'minimal' | 'corporate' | 'standard') => {
    if (preset === 'cyberpunk') {
      setOptions(prev => ({
        ...prev,
        dotsOptions: { color: '#00ffcc', type: 'classy' },
        backgroundOptions: { color: '#0d0f14' },
        cornersSquareOptions: { color: '#ff00ff', type: 'extra-rounded' },
        cornersDotOptions: { color: '#00ffcc', type: 'dot' },
      }));
    } else if (preset === 'minimal') {
      setOptions(prev => ({
        ...prev,
        dotsOptions: { color: '#000000', type: 'dots' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { color: '#000000', type: 'dot' },
        cornersDotOptions: { color: '#000000', type: 'dot' },
      }));
    } else if (preset === 'corporate') {
      setOptions(prev => ({
        ...prev,
        dotsOptions: { color: '#1e3a8a', type: 'square' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { color: '#1e3a8a', type: 'square' },
        cornersDotOptions: { color: '#1e3a8a', type: 'square' },
      }));
    } else if (preset === 'standard') {
      setOptions(prev => ({
        ...prev,
        dotsOptions: { color: '#000000', type: 'square' },
        backgroundOptions: { color: '#ffffff' },
        cornersSquareOptions: { color: '#000000', type: 'square' },
        cornersDotOptions: { color: '#000000', type: 'square' },
      }));
    }
  };

  return (
    <div className="control-section" style={{ borderTop: '1px solid var(--panel-border)' }}>
      <h2 className="section-title"><Palette size={20} aria-hidden="true" /> ปรับแต่งดีไซน์ (Styling)</h2>

      {/* Presets */}
      <h3 className="label" style={{ marginTop: '1rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <Zap size={16} aria-hidden="true" /> เทมเพลตสำเร็จรูป
      </h3>
      <div className="form-group" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => applyPreset('standard')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>มาตรฐาน (Standard)</button>
        <button className="btn btn-secondary" onClick={() => applyPreset('cyberpunk')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>ล้ำยุค (Cyberpunk)</button>
        <button className="btn btn-secondary" onClick={() => applyPreset('minimal')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>เรียบง่าย (Minimal)</button>
        <button className="btn btn-secondary" onClick={() => applyPreset('corporate')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>องค์กร (Corporate)</button>
      </div>

      {/* Colors */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>สีสัน (Colors)</h3>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label" htmlFor="color-dots">สีจุด (Dots Color)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--input-bg)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)' }}>
            <input 
              id="color-dots" type="color" 
              value={options.dotsOptions.color} 
              onChange={e => handleColorChange(['dotsOptions', 'color'], e.target.value)}
              style={{ width: '32px', height: '32px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
              aria-label="Dots Color"
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{options.dotsOptions.color.toUpperCase()}</span>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="color-bg">สีพื้นหลัง (Background)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--input-bg)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)' }}>
            <input 
              id="color-bg" type="color" 
              value={options.backgroundOptions.color} 
              onChange={e => handleColorChange(['backgroundOptions', 'color'], e.target.value)}
              style={{ width: '32px', height: '32px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
              aria-label="Background Color"
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{options.backgroundOptions.color.toUpperCase()}</span>
          </div>
        </div>
      </div>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label" htmlFor="color-sq">สีกรอบมุม (Corner Square)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--input-bg)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)' }}>
            <input 
              id="color-sq" type="color" 
              value={options.cornersSquareOptions.color} 
              onChange={e => handleColorChange(['cornersSquareOptions', 'color'], e.target.value)}
              style={{ width: '32px', height: '32px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
              aria-label="Corner Square Color"
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{options.cornersSquareOptions.color.toUpperCase()}</span>
          </div>
        </div>
        <div>
          <label className="label" htmlFor="color-dot">สีจุดมุม (Corner Dot)</label>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--input-bg)', padding: '4px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--input-border)' }}>
            <input 
              id="color-dot" type="color" 
              value={options.cornersDotOptions.color} 
              onChange={e => handleColorChange(['cornersDotOptions', 'color'], e.target.value)}
              style={{ width: '32px', height: '32px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
              aria-label="Corner Dot Color"
            />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-main)' }}>{options.cornersDotOptions.color.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Shapes */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <Grid size={16} aria-hidden="true" /> รูปทรง (Shapes)
      </h3>
      <div className="form-group">
        <label className="label" htmlFor="type-dots">สไตล์ของจุด (Dots Style)</label>
        <select id="type-dots" className="select" value={options.dotsOptions.type} onChange={e => handleTypeChange(['dotsOptions', 'type'], e.target.value)}>
          <option value="square">สี่เหลี่ยม (Square)</option>
          <option value="dots">จุดกลม (Dots)</option>
          <option value="rounded">โค้งมน (Rounded)</option>
          <option value="extra-rounded">โค้งมนมาก (Extra Rounded)</option>
          <option value="classy">คลาสสิก (Classy)</option>
          <option value="classy-rounded">คลาสสิกโค้งมน (Classy Rounded)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="type-sq">สไตล์กรอบมุม (Corner Square Style)</label>
        <select id="type-sq" className="select" value={options.cornersSquareOptions.type} onChange={e => handleTypeChange(['cornersSquareOptions', 'type'], e.target.value)}>
          <option value="square">สี่เหลี่ยม (Square)</option>
          <option value="dot">จุดกลม (Dot)</option>
          <option value="extra-rounded">โค้งมนมาก (Extra Rounded)</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="type-dot">สไตล์จุดมุม (Corner Dot Style)</label>
        <select id="type-dot" className="select" value={options.cornersDotOptions.type} onChange={e => handleTypeChange(['cornersDotOptions', 'type'], e.target.value)}>
          <option value="square">สี่เหลี่ยม (Square)</option>
          <option value="dot">จุดกลม (Dot)</option>
        </select>
      </div>

      {/* Advanced & Logo */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <ImageIcon size={16} aria-hidden="true" /> โลโก้และการตั้งค่าขั้นสูง (Logo & Advanced)
      </h3>
      <div className="form-group">
        <label className="label" htmlFor="ecl">ระดับการกู้คืนข้อผิดพลาด (แนะนำระดับ High หากมีโลโก้)</label>
        <select id="ecl" className="select" value={options.errorCorrectionLevel} onChange={e => handleTypeChange(['errorCorrectionLevel'], e.target.value)}>
          <option value="L">ต่ำ - Low (7%)</option>
          <option value="M">ปานกลาง - Medium (15%)</option>
          <option value="Q">ดี - Quartile (25%)</option>
          <option value="H">สูงสุด - High (30%)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label className="label" htmlFor="logo-upload">รูปภาพโลโก้ตรงกลาง (Center Logo)</label>
        {options.image ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img src={options.image} alt="Logo preview inside QR" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '4px' }} />
            <button className="btn btn-secondary" onClick={clearLogo} style={{ padding: '6px 12px', fontSize: '0.8rem' }} aria-label="Remove Logo">ลบโลโก้ (Remove)</button>
          </div>
        ) : (
          <input id="logo-upload" type="file" accept="image/*" className="input" onChange={handleLogoUpload} style={{ padding: '6px' }} aria-label="Upload logo image" />
        )}
      </div>
      
      {options.image && (
        <>
          <div className="form-group">
            <label className="label" htmlFor="logo-size">ขนาดโลโก้ (Logo Size)</label>
            <input 
              id="logo-size"
              type="range" min="0.1" max="0.8" step="0.05"
              value={options.imageOptions.imageSize || 0.4} 
              onChange={e => handleTypeChange(['imageOptions', 'imageSize'], parseFloat(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
              aria-label="Logo Size"
            />
          </div>
          <div className="form-group">
            <label className="label" htmlFor="logo-margin">กรอบพื้นหลังโลโก้ (Clear Background)</label>
            <input 
              id="logo-margin"
              type="range" min="0" max="40" 
              value={options.imageOptions.margin} 
              onChange={e => handleTypeChange(['imageOptions', 'margin'], parseInt(e.target.value))}
              style={{ width: '100%', cursor: 'pointer' }}
              aria-label="Logo Margin"
            />
          </div>
        </>
      )}
    </div>
  );
}
