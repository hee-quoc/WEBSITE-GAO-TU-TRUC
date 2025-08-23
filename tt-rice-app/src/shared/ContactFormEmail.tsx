// src/components/emails/ContactFormEmail.tsx
import * as React from 'react';

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export const ContactFormEmail: React.FC<Readonly<ContactFormEmailProps>> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div>
    <h1>Email tự động được gửi từ website</h1>
    <p>Bạn nhận được tin nhắn từ website liên hệ với chúng tôi</p>
    <hr />
    <ul>
      <li><strong>Họ và tên (Name):</strong> {name}</li>
      <li><strong>Email:</strong> {email}</li>
      <li><strong>Điện thoại (Phone):</strong> {phone}</li>
    </ul>
    {message && (
      <>
        <h3>Ghi chú thêm (Message):</h3>
        <p>{message}</p>
      </>
    )}
  </div>
);

export default ContactFormEmail;