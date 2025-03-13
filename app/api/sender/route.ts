import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { name, emailContent } = req.body;

        // Configurar o transporte do nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });

        // Configurar o e-mail
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: process.env.GMAIL_USER, // Enviar para você mesmo
            subject: `Suporte: ${name}`,
            text: emailContent,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'E-mail enviado com sucesso!' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao enviar e-mail', error });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido' });
    }
}