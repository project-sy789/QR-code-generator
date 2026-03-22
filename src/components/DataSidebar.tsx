import React from 'react';
import type { QRDataState, QRDataType } from '../utils/qrBuilders';
import { Link, Type, Mail, Phone, MessageSquare, Wifi, Contact2, CreditCard, MapPin, Bitcoin, CalendarPlus } from 'lucide-react';

interface DataSidebarProps {
  dataState: QRDataState;
  setDataState: React.Dispatch<React.SetStateAction<QRDataState>>;
}

const TYPES: { id: QRDataType; label: string; icon: React.ReactNode }[] = [
  { id: 'url', label: 'เว็บไซต์', icon: <Link aria-hidden="true" /> },
  { id: 'text', label: 'ข้อความ', icon: <Type aria-hidden="true" /> },
  { id: 'email', label: 'อีเมล', icon: <Mail aria-hidden="true" /> },
  { id: 'phone', label: 'เบอร์โทร', icon: <Phone aria-hidden="true" /> },
  { id: 'sms', label: 'SMS', icon: <MessageSquare aria-hidden="true" /> },
  { id: 'wifi', label: 'Wi-Fi', icon: <Wifi aria-hidden="true" /> },
  { id: 'vcard', label: 'นามบัตร', icon: <Contact2 aria-hidden="true" /> },
  { id: 'promptpay', label: 'พร้อมเพย์', icon: <CreditCard aria-hidden="true" /> },
  { id: 'location', label: 'พิกัด(Map)', icon: <MapPin aria-hidden="true" /> },
  { id: 'crypto', label: 'คริปโต', icon: <Bitcoin aria-hidden="true" /> },
  { id: 'event', label: 'ตารางปฏิทิน', icon: <CalendarPlus aria-hidden="true" /> },
];

export default function DataSidebar({ dataState, setDataState }: DataSidebarProps) {
  const updateData = (field: string, value: any, nestedField?: string) => {
    setDataState(prev => {
      if (nestedField) {
        return { ...prev, [field]: { ...(prev as any)[field], [nestedField]: value } };
      }
      return { ...prev, [field]: value };
    });
  };

  return (
    <div className="control-section">
      <h2 className="section-title"><Type size={20} aria-hidden="true" /> ข้อมูลเนื้อหา (Content Data)</h2>
      
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
            <label className="label" htmlFor="input-url">ลิงก์เว็บไซต์ (URL)</label>
            <input 
              id="input-url" type="url" className="input" 
              value={dataState.url} onChange={(e) => updateData('url', e.target.value)}
              placeholder="https://example.com"
            />
          </div>
        )}

        {dataState.type === 'text' && (
          <div className="form-group">
            <label className="label" htmlFor="input-text">ข้อความทั่วไป (Text)</label>
            <textarea 
              id="input-text" className="input" rows={4}
              value={dataState.text} onChange={(e) => updateData('text', e.target.value)}
              placeholder="พิมพ์ข้อความของคุณที่นี่..."
            />
          </div>
        )}

        {dataState.type === 'email' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-email-addr">ที่อยู่อีเมล (Email)</label>
              <input id="input-email-addr" type="email" className="input" value={dataState.email.address} onChange={(e) => updateData('email', e.target.value, 'address')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-email-subj">หัวเรื่อง (Subject)</label>
              <input id="input-email-subj" type="text" className="input" value={dataState.email.subject} onChange={(e) => updateData('email', e.target.value, 'subject')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-email-body">รายละเอียดข้อความ</label>
              <textarea id="input-email-body" className="input" rows={3} value={dataState.email.body} onChange={(e) => updateData('email', e.target.value, 'body')} />
            </div>
          </>
        )}

        {dataState.type === 'phone' && (
          <div className="form-group">
            <label className="label" htmlFor="input-phone">เบอร์โทรศัพท์ (Phone)</label>
            <input id="input-phone" type="tel" className="input" value={dataState.phone} onChange={(e) => updateData('phone', e.target.value)} placeholder="08xxxxxxxx" />
          </div>
        )}

        {dataState.type === 'sms' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-sms-phone">เบอร์โทรศัพท์ปลายทาง</label>
              <input id="input-sms-phone" type="tel" className="input" value={dataState.sms.phone} onChange={(e) => updateData('sms', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-sms-msg">ข้อความ SMS</label>
              <textarea id="input-sms-msg" className="input" rows={3} value={dataState.sms.message} onChange={(e) => updateData('sms', e.target.value, 'message')} />
            </div>
          </>
        )}

        {dataState.type === 'wifi' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-ssid">ชื่อ Wi-Fi (SSID)</label>
              <input id="input-wifi-ssid" type="text" className="input" value={dataState.wifi.ssid} onChange={(e) => updateData('wifi', e.target.value, 'ssid')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-pwd">รหัสผ่าน (Password)</label>
              <input id="input-wifi-pwd" type="password" className="input" value={dataState.wifi.password} onChange={(e) => updateData('wifi', e.target.value, 'password')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-wifi-enc">ระบบรักษาความปลอดภัย (Encryption)</label>
              <select id="input-wifi-enc" className="select" value={dataState.wifi.encryption} onChange={(e) => updateData('wifi', e.target.value, 'encryption')}>
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">ไม่มีรหัสผ่าน (None)</option>
              </select>
            </div>
          </>
        )}

        {dataState.type === 'vcard' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-fname">ชื่อ (First Name)</label>
              <input id="input-vc-fname" type="text" className="input" value={dataState.vcard.firstName} onChange={(e) => updateData('vcard', e.target.value, 'firstName')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-lname">นามสกุล (Last Name)</label>
              <input id="input-vc-lname" type="text" className="input" value={dataState.vcard.lastName} onChange={(e) => updateData('vcard', e.target.value, 'lastName')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-comp">บริษัท (Company)</label>
              <input id="input-vc-comp" type="text" className="input" value={dataState.vcard.company} onChange={(e) => updateData('vcard', e.target.value, 'company')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-title">ตำแหน่ง (Title)</label>
              <input id="input-vc-title" type="text" className="input" value={dataState.vcard.title} onChange={(e) => updateData('vcard', e.target.value, 'title')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-phone">เบอร์โทร (Phone)</label>
              <input id="input-vc-phone" type="tel" className="input" value={dataState.vcard.phone} onChange={(e) => updateData('vcard', e.target.value, 'phone')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-vc-email">อีเมล (Email)</label>
              <input id="input-vc-email" type="email" className="input" value={dataState.vcard.email} onChange={(e) => updateData('vcard', e.target.value, 'email')} />
            </div>
          </>
        )}

        {dataState.type === 'promptpay' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-pp-id">รหัสพร้อมเพย์ (เบอร์โทร หรือ บัตรประชาชน)</label>
              <input id="input-pp-id" type="tel" className="input" value={dataState.promptpay.id} onChange={(e) => updateData('promptpay', e.target.value, 'id')} placeholder="08xxxxxxxx หรือ 1xx..." />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-pp-amt">จำนวนเงิน (ใส่หรือไม่ใส่ก็ได้)</label>
              <input id="input-pp-amt" type="number" step="0.01" className="input" value={dataState.promptpay.amount} onChange={(e) => updateData('promptpay', e.target.value, 'amount')} placeholder="0.00" />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-pp-acc">ชื่อบัญชี (แสดงผลบนป้ายสแกน)</label>
              <input id="input-pp-acc" type="text" className="input" value={dataState.promptpay.accountName || ''} onChange={(e) => updateData('promptpay', e.target.value, 'accountName')} placeholder="เช่น นาย สมชาย ใจดี" />
            </div>
            <div className="form-group" style={{ marginTop: '12px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={dataState.promptpay.showBanner !== false} 
                  onChange={(e) => updateData('promptpay', e.target.checked, 'showBanner')} 
                  style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>แสดงป้ายตั้งโต๊ะ (Merchant Banner)</span>
              </label>
            </div>
            <div className="form-group" style={{ marginTop: '8px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={!!dataState.promptpay.monochrome} 
                  onChange={(e) => updateData('promptpay', e.target.checked, 'monochrome')} 
                  style={{ width: '18px', height: '18px', accentColor: '#10b981', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>รูปแบบขาว-ดำ (Monochrome)</span>
              </label>
            </div>
          </>
        )}

        {dataState.type === 'location' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-loc-lat">ละติจูด (Latitude)</label>
              <input id="input-loc-lat" type="text" className="input" value={dataState.location.lat} onChange={(e) => updateData('location', e.target.value, 'lat')} placeholder="Ex: 13.7563" />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-loc-lng">ลองจิจูด (Longitude)</label>
              <input id="input-loc-lng" type="text" className="input" value={dataState.location.lng} onChange={(e) => updateData('location', e.target.value, 'lng')} placeholder="Ex: 100.5018" />
            </div>
          </>
        )}

        {dataState.type === 'crypto' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-crypto-coin">เหรียญ (Coin)</label>
              <select id="input-crypto-coin" className="select" value={dataState.crypto.coin} onChange={(e) => updateData('crypto', e.target.value, 'coin')}>
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="tether">Tether (USDT)</option>
                <option value="binancecoin">Binance Coin (BNB)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="cardano">Cardano (ADA)</option>
                <option value="dogecoin">Dogecoin (DOGE)</option>
                <option value="ripple">Ripple (XRP)</option>
              </select>
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-crypto-addr">ที่อยู่กระเป๋าเงิน (Wallet Address)</label>
              <input id="input-crypto-addr" type="text" className="input" value={dataState.crypto.address} onChange={(e) => updateData('crypto', e.target.value, 'address')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-crypto-amt">จำนวน (Amount - Optional)</label>
              <input id="input-crypto-amt" type="number" step="0.000001" className="input" value={dataState.crypto.amount} onChange={(e) => updateData('crypto', e.target.value, 'amount')} />
            </div>
          </>
        )}

        {dataState.type === 'event' && (
          <>
            <div className="form-group">
              <label className="label" htmlFor="input-event-title">ชื่องาน/กิจกรรม (Title)</label>
              <input id="input-event-title" type="text" className="input" value={dataState.event.title} onChange={(e) => updateData('event', e.target.value, 'title')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-event-loc">สถานที่ (Location)</label>
              <input id="input-event-loc" type="text" className="input" value={dataState.event.location} onChange={(e) => updateData('event', e.target.value, 'location')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-event-start">เริ่มเวลา (Start)</label>
              <input id="input-event-start" type="datetime-local" className="input" value={dataState.event.start} onChange={(e) => updateData('event', e.target.value, 'start')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-event-end">สิ้นสุดเวลา (End)</label>
              <input id="input-event-end" type="datetime-local" className="input" value={dataState.event.end} onChange={(e) => updateData('event', e.target.value, 'end')} />
            </div>
            <div className="form-group">
              <label className="label" htmlFor="input-event-desc">รายละเอียด (Description - Optional)</label>
              <textarea id="input-event-desc" className="input" rows={2} value={dataState.event.description} onChange={(e) => updateData('event', e.target.value, 'description')} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
