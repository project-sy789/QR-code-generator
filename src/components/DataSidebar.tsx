import React from 'react';
import type { QRDataState, QRDataType } from '../utils/qrBuilders';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, Contact2 } from 'lucide-react';

interface DataSidebarProps {
  dataState: QRDataState;
  setDataState: React.Dispatch<React.SetStateAction<QRDataState>>;
}

const TYPES: { id: QRDataType; label: string; icon: React.ReactNode }[] = [
  { id: 'url', label: 'URL', icon: <Link aria-hidden="true" /> },
  { id: 'text', label: 'Text', icon: <Type aria-hidden="true" /> },
  { id: 'email', label: 'Email', icon: <Mail aria-hidden="true" /> },
  { id: 'phone', label: 'Phone', icon: <Phone aria-hidden="true" /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare aria-hidden="true" /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi aria-hidden="true" /> },
  { id: 'vcard', label: 'vCard', icon: <Contact2 aria-hidden="true" /> },
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
      <h2 className="section-title"><Type size={20} aria-hidden="true" /> Content Data</h2>
      
      <div className="type-selector" role="group" aria-label="Select Data Type">
        {TYPES.map(t => (
          <button
            key={t.id}
            className={`type-btn ${dataState.type === t.id ? 'active' : ''}`}
            onClick={() => setDataState(prev => ({ ...prev, type: t.id }))}
            aria-pressed={dataState.type === t.id}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="form-container">
        {dataState.type === 'url' && (
          <div className="form-group">
            <label className="label" htmlFor="input-url">Website URL</label>
            <input 
              id="input-url" type="url" className="input" 
              value={dataState.url} onChange={(e) => updateData('url', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        )}

        {dataState.type === 'text' && (
          <div className="form-group">
            <label className="label" htmlFor="input-text">Plain Text</label>
            <textarea 
              id="input-text" className="input" rows={4}
              value={dataState.text} onChange={(e) => updateData('text', e.target.value)}
              placeholder="Enter your message here..."
            />
          </div>
        )}

        {dataState.type === 'email' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-email-addr">Email Address</label>
              <input id="input-email-addr" type="email" className="input" value={dataState.email.address} onChange={(e) => updateData('email', e.target.value, 'address')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-email-subj">Subject</label>
              <input id="input-email-subj" type="text" className="input" value={dataState.email.subject} onChange={(e) => updateData('email', e.target.value, 'subject')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-email-body">Message Body</label>
              <textarea id="input-email-body" className="input" rows={3} value={dataState.email.body} onChange={(e) => updateData('email', e.target.value, 'body')} />
            </div>
          </>
        )}

        {dataState.type === 'phone' && (
          <div className="form-group">
            <label className="label" htmlFor="input-phone">Phone Number</label>
            <input id="input-phone" type="tel" className="input" value={dataState.phone} onChange={(e) => updateData('phone', e.target.value)} placeholder="+1234567890" />
          </div>
        )}

        {dataState.type === 'sms' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-sms-phone">Phone Number</label>
              <input id="input-sms-phone" type="tel" className="input" value={dataState.sms.phone} onChange={(e) => updateData('sms', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-sms-msg">Message</label>
              <textarea id="input-sms-msg" className="input" rows={3} value={dataState.sms.message} onChange={(e) => updateData('sms', e.target.value, 'message')} />
            </div>
          </>
        )}

        {dataState.type === 'wifi' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-ssid">Network Name (SSID)</label>
              <input id="input-wifi-ssid" type="text" className="input" value={dataState.wifi.ssid} onChange={(e) => updateData('wifi', e.target.value, 'ssid')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-pwd">Password</label>
              <input id="input-wifi-pwd" type="password" className="input" value={dataState.wifi.password} onChange={(e) => updateData('wifi', e.target.value, 'password')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-enc">Encryption</label>
              <select id="input-wifi-enc" className="select" value={dataState.wifi.encryption} onChange={(e) => updateData('wifi', e.target.value, 'encryption')}>
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
              <label className="label" htmlFor="input-vc-fname">First Name</label>
              <input id="input-vc-fname" type="text" className="input" value={dataState.vcard.firstName} onChange={(e) => updateData('vcard', e.target.value, 'firstName')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-lname">Last Name</label>
              <input id="input-vc-lname" type="text" className="input" value={dataState.vcard.lastName} onChange={(e) => updateData('vcard', e.target.value, 'lastName')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-comp">Company</label>
              <input id="input-vc-comp" type="text" className="input" value={dataState.vcard.company} onChange={(e) => updateData('vcard', e.target.value, 'company')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-title">Title</label>
              <input id="input-vc-title" type="text" className="input" value={dataState.vcard.title} onChange={(e) => updateData('vcard', e.target.value, 'title')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-phone">Phone</label>
              <input id="input-vc-phone" type="tel" className="input" value={dataState.vcard.phone} onChange={(e) => updateData('vcard', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-email">Email</label>
              <input id="input-vc-email" type="email" className="input" value={dataState.vcard.email} onChange={(e) => updateData('vcard', e.target.value, 'email')} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
