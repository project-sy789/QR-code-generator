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

  const applyPreset = (preset: 'cyberpunk' | 'minimal' | 'corporate') => {
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
    }
  };

  return (
    <div className="control-section" style={{ borderTop: '1px solid var(--panel-border)' }}>
      <h2 className="section-title"><Palette size={20} aria-hidden="true" /> Styling Options</h2>

      {/* Presets */}
      <h3 className="label" style={{ marginTop: '1rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <Zap size={16} aria-hidden="true" /> Design Templates
      </h3>
      <div className="form-group" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <button className="btn btn-secondary" onClick={() => applyPreset('cyberpunk')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Cyberpunk</button>
        <button className="btn btn-secondary" onClick={() => applyPreset('minimal')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Minimal</button>
        <button className="btn btn-secondary" onClick={() => applyPreset('corporate')} style={{ padding: '6px 10px', fontSize: '0.85rem' }}>Corporate</button>
      </div>

      {/* Colors */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)' }}>Colors</h3>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label" htmlFor="color-dots">Dots Color</label>
          <input 
            id="color-dots"
            type="color" 
            value={options.dotsOptions.color} 
            onChange={e => handleColorChange(['dotsOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            aria-label="Dots Color"
          />
        </div>
        <div>
          <label className="label" htmlFor="color-bg">Background</label>
          <input 
            id="color-bg"
            type="color" 
            value={options.backgroundOptions.color} 
            onChange={e => handleColorChange(['backgroundOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            aria-label="Background Color"
          />
        </div>
      </div>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label" htmlFor="color-sq">Corner Square</label>
          <input 
            id="color-sq"
            type="color" 
            value={options.cornersSquareOptions.color} 
            onChange={e => handleColorChange(['cornersSquareOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            aria-label="Corner Square Color"
          />
        </div>
        <div>
          <label className="label" htmlFor="color-dot">Corner Dot</label>
          <input 
            id="color-dot"
            type="color" 
            value={options.cornersDotOptions.color} 
            onChange={e => handleColorChange(['cornersDotOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
            aria-label="Corner Dot Color"
          />
        </div>
      </div>

      {/* Shapes */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <Grid size={16} aria-hidden="true" /> Shapes
      </h3>
      <div className="form-group">
        <label className="label" htmlFor="type-dots">Dots Style</label>
        <select id="type-dots" className="select" value={options.dotsOptions.type} onChange={e => handleTypeChange(['dotsOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy Rounded</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="type-sq">Corner Square Style</label>
        <select id="type-sq" className="select" value={options.cornersSquareOptions.type} onChange={e => handleTypeChange(['cornersSquareOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label" htmlFor="type-dot">Corner Dot Style</label>
        <select id="type-dot" className="select" value={options.cornersDotOptions.type} onChange={e => handleTypeChange(['cornersDotOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>

      {/* Advanced & Logo */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <ImageIcon size={16} aria-hidden="true" /> Logo & Advanced
      </h3>
      <div className="form-group">
        <label className="label" htmlFor="ecl">Error Correction Level (Level H best for Logos)</label>
        <select id="ecl" className="select" value={options.errorCorrectionLevel} onChange={e => handleTypeChange(['errorCorrectionLevel'], e.target.value)}>
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label className="label" htmlFor="logo-upload">Center Logo Image</label>
        {options.image ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img src={options.image} alt="Logo preview inside QR" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '4px' }} />
            <button className="btn btn-secondary" onClick={clearLogo} style={{ padding: '6px 12px', fontSize: '0.8rem' }} aria-label="Remove Logo">Remove</button>
          </div>
        ) : (
          <input id="logo-upload" type="file" accept="image/*" className="input" onChange={handleLogoUpload} style={{ padding: '6px' }} aria-label="Upload logo image" />
        )}
      </div>
      
      {options.image && (
        <div className="form-group">
          <label className="label" htmlFor="logo-margin">Logo Margin (Spacing around logo)</label>
          <input 
            id="logo-margin"
            type="range" min="0" max="20" 
            value={options.imageOptions.margin} 
            onChange={e => handleTypeChange(['imageOptions', 'margin'], parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
            aria-label="Logo Margin"
          />
        </div>
      )}
    </div>
  );
}
