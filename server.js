import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from dist directory
app.use(express.static(path.join(__dirname, 'dist')));

const serviceLabels = {
  book: 'Book de fotos (retrato)',
  producto: 'Foto producto / catálogo',
  redes: 'Redes sociales (plan mensual)',
  eventos: 'Cobertura de eventos',
  personalizado: 'Proyecto personalizado'
};

app.post('/api/send-email', async (req, res) => {
  try {
    const { nombre, email, telefono, servicio, mensaje } = req.body;

    const servicioLabel = serviceLabels[servicio] || servicio;
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.EMAIL_TO || 'info@arkana.com.ar',
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
    
    res.json({ success: true });
    
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

// Serve React app for all non-API routes
app.get('*', (req, res) => {
  if (!req.path.startsWith('/api')) {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});