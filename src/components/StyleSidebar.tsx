import React from 'react';
import { Palette, Grid, Image as ImageIcon } from 'lucide-react';
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
      // Preserve image file if deep cloning erased the reference
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

  return (
    <div className="control-section" style={{ borderTop: '1px solid var(--panel-border)' }}>
      <h2 className="section-title"><Palette size={20} /> Styling Options</h2>

      {/* Colors */}
      <h3 className="label" style={{ marginTop: '1rem', color: 'var(--text-main)' }}>Colors</h3>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label">Dots Color</label>
          <input 
            type="color" 
            value={options.dotsOptions.color} 
            onChange={e => handleColorChange(['dotsOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
          />
        </div>
        <div>
          <label className="label">Background</label>
          <input 
            type="color" 
            value={options.backgroundOptions.color} 
            onChange={e => handleColorChange(['backgroundOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
          />
        </div>
      </div>
      <div className="form-group" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label className="label">Corner Square</label>
          <input 
            type="color" 
            value={options.cornersSquareOptions.color} 
            onChange={e => handleColorChange(['cornersSquareOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
          />
        </div>
        <div>
          <label className="label">Corner Dot</label>
          <input 
            type="color" 
            value={options.cornersDotOptions.color} 
            onChange={e => handleColorChange(['cornersDotOptions', 'color'], e.target.value)}
            style={{ width: '100%', height: '40px', padding: '0', border: 'none', borderRadius: '4px', cursor: 'pointer', background: 'transparent' }}
          />
        </div>
      </div>

      {/* Shapes */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <Grid size={16}/> Shapes
      </h3>
      <div className="form-group">
        <label className="label">Dots Style</label>
        <select className="select" value={options.dotsOptions.type} onChange={e => handleTypeChange(['dotsOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dots">Dots</option>
          <option value="rounded">Rounded</option>
          <option value="extra-rounded">Extra Rounded</option>
          <option value="classy">Classy</option>
          <option value="classy-rounded">Classy Rounded</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label">Corner Square Style</label>
        <select className="select" value={options.cornersSquareOptions.type} onChange={e => handleTypeChange(['cornersSquareOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
          <option value="extra-rounded">Extra Rounded</option>
        </select>
      </div>
      <div className="form-group">
        <label className="label">Corner Dot Style</label>
        <select className="select" value={options.cornersDotOptions.type} onChange={e => handleTypeChange(['cornersDotOptions', 'type'], e.target.value)}>
          <option value="square">Square</option>
          <option value="dot">Dot</option>
        </select>
      </div>

      {/* Advanced & Logo */}
      <h3 className="label" style={{ marginTop: '1.5rem', color: 'var(--text-main)', display: 'flex', alignItems:'center', gap: '6px' }}>
        <ImageIcon size={16}/> Logo & Advanced
      </h3>
      <div className="form-group">
        <label className="label">Error Correction Level (Level H best for Logos)</label>
        <select className="select" value={options.errorCorrectionLevel} onChange={e => handleTypeChange(['errorCorrectionLevel'], e.target.value)}>
          <option value="L">Low (7%)</option>
          <option value="M">Medium (15%)</option>
          <option value="Q">Quartile (25%)</option>
          <option value="H">High (30%)</option>
        </select>
      </div>
      
      <div className="form-group">
        <label className="label">Center Logo Image</label>
        {options.image ? (
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <img src={options.image} alt="Logo" style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#fff', borderRadius: '4px' }} />
            <button className="btn btn-secondary" onClick={clearLogo} style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Remove</button>
          </div>
        ) : (
          <input type="file" accept="image/*" className="input" onChange={handleLogoUpload} style={{ padding: '6px' }} />
        )}
      </div>
      
      {options.image && (
        <div className="form-group">
          <label className="label">Logo Margin (Spacing around logo)</label>
          <input 
            type="range" min="0" max="20" 
            value={options.imageOptions.margin} 
            onChange={e => handleTypeChange(['imageOptions', 'margin'], parseInt(e.target.value))}
            style={{ width: '100%', cursor: 'pointer' }}
          />
        </div>
      )}
    </div>
  );
}
