import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } }
};

export default function SEOContent() {
  return (
    <footer className="glass-panel" style={{ marginTop: '1rem', padding: '2.5rem', borderRadius: 'var(--radius-xl)', overflow: 'hidden' }}>
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1.2rem', fontSize: '1.5rem', fontWeight: 600 }}>
          ทำไมต้องใช้โปรแกรมสร้างคิวอาร์โค้ด (QR Code Generator) ของเรา?
        </h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem', marginBottom: '1.5rem' }}>
          หากคุณกำลังตามหา <strong>วิธีสร้าง QR Code ฟรี</strong> ที่ไม่ต้องเสียเวลาสมัครสมาชิก ไม่มีโฆษณาป๊อปอัปให้รำคาญใจ และที่สำคัญที่สุดคือ <strong>QR Code ไม่มีวันหมดอายุ</strong> คุณมาถูกที่แล้ว! เว็บไซต์สร้างคิวอาร์โค้ดส่วนใหญ่ในหน้าค้นหามักจะแอบแฝงการย่อลิงก์ (Dynamic URL) ของบริษัทเขาเข้าไปด้วย เพื่อบังคับให้คุณจ่ายเงินอัปเกรดในภายหลัง <br/><br/>
          แต่ระบบของเราคือการสร้าง <em>Static QR Code</em> แท้ 100% ซึ่งจะฝังข้อมูลของคุณลงไปในรหัสภาพโดนตรง ปลอดภัยที่สุด และแสกนได้รวดเร็วทันใจ
        </p>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-glow)', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>🇹🇭</span> เครื่องมือสร้าง QR Code พร้อมเพย์ (PromptPay) ที่ดีที่สุด
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
            แม่ค้าออนไลน์และร้านค้าห้ามพลาด! คุณสามารถใช้ระบบของเรา <strong>สร้าง QR Code พร้อมเพย์ (PromptPay)</strong> เพื่อรับเงินโอนได้ฟรี รองรับการผูกทั้งเบอร์โทรศัพท์และบัตรประชาชน พร้อมให้คุณระบุ <strong>จำนวนเงินที่ต้องโอน (Amount)</strong> เพื่อให้ลูกค้าสแกนเป๊ะ กดยืนยันโอนเงินได้ปั๊บ โดยไม่ต้องกดพิมพ์ตังค์เอง ลดปัญหาโอนขาดหรือโอนผิดได้อย่างสมบูรณ์แบบ สแกนได้กับทุกแอปธนาคาร รวดเร็วและแม่นยำที่สุด!
          </p>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>
          👑 จุดเด่นที่โปรแกรมของเราเหนือกว่าเว็บค้นหาทั่วไป:
        </h3>
        <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem', listStyleType: 'disc', color: 'var(--text-muted)', lineHeight: '1.8' }}>
          <li style={{ marginBottom: '0.8rem' }}><strong>ไม่มีโฆษณาแอบแฝง :</strong> ลิงก์ของคุณจะสะอาด ปลอดภัย ส่งตรงถึงปลายทางทันที ไม่ถูกคั่นกลาง</li>
          <li style={{ marginBottom: '0.8rem' }}><strong>ความเป็นส่วนตัวสูงสุด (Privacy First) :</strong> การสร้างเกิดขึ้นบนเครื่องของคุณแบบ Offline 100% ไม่มีใครเห็นข้อมูลคุณ</li>
          <li style={{ marginBottom: '0.8rem' }}><strong>ออกแบบสวยงามระดับพรีเมียม :</strong> เลือกเทมเพลตสี เปลี่ยนรูปทรง ใส่โลโก้ตรงกลาง ได้ตามอิสระ</li>
          <li style={{ marginBottom: '0.8rem' }}><strong>รองรับข้อมูลระดับองค์กร (Pro Types) :</strong> นอกเหนือจากลิงก์ เรายังรองรับ <strong>PromptPay</strong>โอนเงิน, พิกัด <strong>Google Maps</strong>, งานอีเวนต์ <strong>vEvent</strong>, กระเป๋าคริปโต <strong>(BTC, ETH, USDT ฯลฯ)</strong> และ <strong>vCard</strong> นามบัตรดิจิทัล</li>
          <li style={{ marginBottom: '0.8rem' }}><strong>ระบบสร้างทีละเยอะๆ (Batch Generator) :</strong> อัปโหลด Excel/CSV เพื่อดึงออกเป็นรูปร้อยๆ พันๆ รูปในรูปแบบ ZIP ในคลิกเดียว</li>
        </ul>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <div style={{ background: 'var(--input-bg)', padding: '1.5rem', borderRadius: 'var(--radius-lg)', border: '1px solid var(--primary-glow)', marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>📸</span> ฟีเจอร์ใหม่! เครื่องสแกนคิวอาร์โค้ดอัจฉริยะ (Native Scanner)
          </h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
            ไม่เพียงแค่สร้าง แต่คุณสามารถ <strong>สแกน QR Code (Scan)</strong> ผ่านเว็บของเราได้ทันที! ระบบสแกนเนอร์ถูกออกแบบมาให้ทำงานรวดเร็วระดับแอปพลิเคชัน (Native-like) รองรับการสลับกล้องหน้า/หลังแบบไร้รอยต่อ และไม้ตายสำคัญสำหรับผู้ใช้คอมพิวเตอร์คือฟีเจอร์ <strong>ลากแล้ววาง (Drag & Drop)</strong> เพียงแค่ลากไฟล์รูปภาพมาปล่อยลงบนหน้าจอ ระบบจะถอดรหัสข้อความออกมาให้คุณก็อปปี้หรือเปิดลิงก์ต่อได้ทันที โดยข้อมูลทั้งหมดจะถูกประมวลผลอยู่แค่ในเครื่องของคุณเท่านั้น (Client-side Privacy) ปลอดภัย 100%
          </p>
        </div>
      </motion.div>

      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={fadeInUp}>
        <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.2rem' }}>
          💡 เคล็ดลับการทำ QR Code ให้น่าสแกนและสแกนติดไว
        </h3>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8', fontSize: '1rem' }}>
          ตามมาตรฐานแล้ว กล้องมือถือจะสแกนได้รวดเร็วที่สุดเมื่อพื้นหลังมีสีสว่าง (เช่น ขาว/พาสเทล) และตัวจุดของคิวอาร์มีสีเข้มตัดกัน <br/><br/>
          นอกจากนี้ หากคุณอัปโหลดภาพโลโก้ไว้ตรงกลาง อย่าลืมรักษาระดับเคลียร์ข้อมูลผิดพลาด <strong>(Error Correction) ให้เป็นระดับ High (30%)</strong> เสมอ! ซึ่งเราตั้งค่าเหล่านี้เป็นค่ามาตรฐานไว้ให้คุณพร้อมหมดแล้ว ขอให้สนุกกับการสร้างแบรนด์!
        </p>
      </motion.div>
    </footer>
  );
}
