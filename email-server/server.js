import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';

config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: ['http://localhost:5174', 'https://your-frontend-domain.com'],
  credentials: true
}));
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Test endpoint
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ message: 'Email server is working!' });
});

const serviceLabels = {
  book: 'Book de fotos (retrato)',
  producto: 'Foto producto / catálogo',
  redes: 'Redes sociales (plan mensual)',
  eventos: 'Cobertura de eventos',
  personalizado: 'Proyecto personalizado'
};

app.post('/api/send-email', async (req, res) => {
  console.log('\n=== EMAIL DEBUG START ===');
  console.log('Request received:', new Date().toISOString());
  console.log('Request body:', req.body);
  
  try {
    const { nombre, email, telefono, servicio, mensaje } = req.body;

    console.log('Environment variables:');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
    console.log('EMAIL_TO:', process.env.EMAIL_TO);

    const servicioLabel = serviceLabels[servicio] || servicio;
    
    console.log('Creating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    console.log('Sending email...');
   
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: `Nueva solicitud de presupuesto - ${servicioLabel}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0d9488;">Nueva solicitud de presupuesto</h2>
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Teléfono:</strong> ${telefono || 'No proporcionado'}</p>
            <p><strong>Servicio de interés:</strong> ${servicioLabel}</p>
          </div>
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Mensaje:</h3>
            <p style="background: #f9fafb; padding: 15px; border-left: 4px solid #0d9488; margin: 10px 0;">${mensaje}</p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">Este mensaje fue enviado desde el formulario de contacto del sitio web.</p>
        </div>
      `
    });
    
    console.log('Email sent successfully!');
    console.log('Message ID:', result.messageId);
    console.log('=== EMAIL DEBUG END ===\n');
    
    res.json({ success: true, messageId: result.messageId });
    
  } catch (error) {
    console.error('\n=== EMAIL ERROR ===');
    console.error('Error details:', error);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    console.error('=== EMAIL ERROR END ===\n');
    res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Email server running on port ${PORT}`);
});