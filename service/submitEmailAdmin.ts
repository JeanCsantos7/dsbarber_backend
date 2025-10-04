import nodemailer from "nodemailer";
import SubmitEmailModel from "../model/submitEmailAdmin";

import dotenv from "dotenv"

dotenv.config()

class SubmitEmailService {
  sendBookingEmail = async (response: SubmitEmailModel) => {
    if (!response.name || !response.email || !response.date || !response.telefone) {
      throw new Error("Todos os campos são obrigatórios.");
     
    }

    const transporter = nodemailer.createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            
            auth:{
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_API_KEY
            }
    });

    const info = await transporter.sendMail({
      from: `"Ds Barber" <${"dsbarber11@gmail.com"}>`,
      to: `"Ds Barber" <${"dsbarber11@gmail.com"}>`,
      subject: "Confirmação de Agendamento!",
      text: `Você tem um novo agendamento de ${response.name} no dia ${response.date}`, 
      html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 25px; width: 100%; box-sizing: border-box;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #528a14; text-align: center;">Você tem um novo agendamento!</h2>
          <p style="font-size: 16px; color: #555555;">Olá, Duh!</p>
          <p style="font-size: 16px; color: #555555;">Um novo cliente realizou um agendamento para o dia <b>${response.date}</b>.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
         
          <p style="font-size: 14px; color: #777777;"><b>Nome do cliente:</b> ${response.name}</p>
          <p style="font-size: 14px; color: #777777;"><b>Telefone do cliente:</b> ${response.telefone}</p>
        </div>
      </div>
      `,
    });

    console.log("E-mail enviado:", info.messageId);
    return info;
  };
}

export default new SubmitEmailService();
