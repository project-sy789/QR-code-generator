import React from 'react';
import type { QRDataState, QRDataType } from '../utils/qrBuilders';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, Contact2 } from 'lucide-react';

interface DataSidebarProps {
  dataState: QRDataState;
  setDataState: React.Dispatch<React.SetStateAction<QRDataState>>;
}

const TYPES: { id: QRDataType; label: string; icon: React.ReactNode }[] = [
  { id: 'url', label: 'URL', icon: <Link /> },
  { id: 'text', label: 'Text', icon: <Type /> },
  { id: 'email', label: 'Email', icon: <Mail /> },
  { id: 'phone', label: 'Phone', icon: <Phone /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi /> },
  { id: 'vcard', label: 'vCard', icon: <Contact2 /> },
];

export default function DataSidebar({ dataState, setDataState }: DataSidebarProps) {
  const updateData = (field: string, value: string, nestedField?: string) => {
    setDataState(prev => {
      if (nestedField) {
        return { ...prev, [field]: { ...(prev as any)[field], [nestedField]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <div className="control-section">
      <h2 className="section-title"><Type size={20} /> Content Data</h2>
      
      <div className="type-selector">
        {TYPES.map(t => (
          <button
            key={t.id}
            className={`type-btn ${dataState.type === t.id ? 'active' : ''}`}
            onClick={() => setDataState(prev => ({ ...prev, type: t.id }))}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="form-container">
        {dataState.type === 'url' && (
          <div className="form-group">
            <label className="label">Website URL</label>
            <input 
              type="url" className="input" 
              value={dataState.url} onChange={(e) => updateData('url', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        )}

        {dataState.type === 'text' && (
          <div className="form-group">
            <label className="label">Plain Text</label>
            <textarea 
              className="input" rows={4}
              value={dataState.text} onChange={(e) => updateData('text', e.target.value)}
              placeholder="Enter your message here..."
            />
          </div>
        )}

        {dataState.type === 'email' && (
          <>
            <div className="form-group">
              <label className="label">Email Address</label>
              <input type="email" className="input" value={dataState.email.address} onChange={(e) => updateData('email', e.target.value, 'address')} />
            </div>
            <div className="form-group">
              <label className="label">Subject</label>
              <input type="text" className="input" value={dataState.email.subject} onChange={(e) => updateData('email', e.target.value, 'subject')} />
            </div>
            <div className="form-group">
              <label className="label">Message Body</label>
              <textarea className="input" rows={3} value={dataState.email.body} onChange={(e) => updateData('email', e.target.value, 'body')} />
            </div>
          </>
        )}

        {dataState.type === 'phone' && (
          <div className="form-group">
            <label className="label">Phone Number</label>
            <input type="tel" className="input" value={dataState.phone} onChange={(e) => updateData('phone', e.target.value)} placeholder="+1234567890" />
          </div>
        )}

        {dataState.type === 'sms' && (
          <>
            <div className="form-group">
              <label className="label">Phone Number</label>
              <input type="tel" className="input" value={dataState.sms.phone} onChange={(e) => updateData('sms', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label">Message</label>
              <textarea className="input" rows={3} value={dataState.sms.message} onChange={(e) => updateData('sms', e.target.value, 'message')} />
            </div>
          </>
        )}

        {dataState.type === 'wifi' && (
          <>
            <div className="form-group">
              <label className="label">Network Name (SSID)</label>
              <input type="text" className="input" value={dataState.wifi.ssid} onChange={(e) => updateData('wifi', e.target.value, 'ssid')} />
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <input type="password" className="input" value={dataState.wifi.password} onChange={(e) => updateData('wifi', e.target.value, 'password')} />
            </div>
            <div className="form-group">
              <label className="label">Encryption</label>
              <select className="select" value={dataState.wifi.encryption} onChange={(e) => updateData('wifi', e.target.value, 'encryption')}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">None</option>
              </select>
            </div>
          </>
        )}

        {dataState.type === 'vcard' && (
          <>
            <div className="form-group">
              <label className="label">First Name</label>
              <input type="text" className="input" value={dataState.vcard.firstName} onChange={(e) => updateData('vcard', e.target.value, 'firstName')} />
            </div>
            <div className="form-group">
              <label className="label">Last Name</label>
              <input type="text" className="input" value={dataState.vcard.lastName} onChange={(e) => updateData('vcard', e.target.value, 'lastName')} />
            </div>
            <div className="form-group">
              <label className="label">Company</label>
              <input type="text" className="input" value={dataState.vcard.company} onChange={(e) => updateData('vcard', e.target.value, 'company')} />
            </div>
            <div className="form-group">
              <label className="label">Title</label>
              <input type="text" className="input" value={dataState.vcard.title} onChange={(e) => updateData('vcard', e.target.value, 'title')} />
            </div>
            <div className="form-group">
              <label className="label">Phone</label>
              <input type="tel" className="input" value={dataState.vcard.phone} onChange={(e) => updateData('vcard', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label">Email</label>
              <input type="email" className="input" value={dataState.vcard.email} onChange={(e) => updateData('vcard', e.target.value, 'email')} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
