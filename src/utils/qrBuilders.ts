import generatePayload from 'promptpay-qr';

export type QRDataType = 'url' | 'text' | 'email' | 'phone' | 'sms' | 'wifi' | 'vcard' | 'promptpay';

export interface QRDataState {
  type: QRDataType;
  url: string;
  text: string;
  email: { address: string; subject: string; body: string };
  phone: string;
  sms: { phone: string; message: string };
  wifi: { ssid: string; password: string; encryption: 'WPA' | 'WEP' | 'nopass'; hidden: boolean };
  vcard: { firstName: string; lastName: string; phone: string; email: string; company: string; title: string; website: string };
  promptpay: { id: string; amount: string };
}

export const buildQRDataString = (state: QRDataState): string => {
  switch (state.type) {
    case 'url':
      return state.url || 'https://';
    case 'text':
      return state.text || ' ';
    case 'email':
      return `mailto:${state.email.address}?subject=${encodeURIComponent(state.email.subject)}&body=${encodeURIComponent(state.email.body)}`;
    case 'phone':
      return `tel:${state.phone}`;
    case 'sms':
      return `smsto:${state.sms.phone}:${state.sms.message}`;
    case 'wifi':
      return `WIFI:T:${state.wifi.encryption};S:${state.wifi.ssid};P:${state.wifi.password};H:${state.wifi.hidden};;`;
    case 'vcard':
      return `BEGIN:VCARD\nVERSION:3.0\nN:${state.vcard.lastName};${state.vcard.firstName}\nFN:${state.vcard.firstName} ${state.vcard.lastName}\nORG:${state.vcard.company}\nTITLE:${state.vcard.title}\nTEL;TYPE=work,voice:${state.vcard.phone}\nEMAIL;TYPE=internet,pref:${state.vcard.email}\nURL:${state.vcard.website}\nEND:VCARD`;
    case 'promptpay': {
      if (!state.promptpay.id) return '';
      const amt = state.promptpay.amount ? parseFloat(state.promptpay.amount) : undefined;
      return generatePayload(state.promptpay.id, { amount: amt });
    }
    default:
      return '';
  }
};
