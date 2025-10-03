import SubmitEmailUsersModel from "../model/submitEmailUser"
import nodemailer from "nodemailer"

import dotenv from "dotenv"

dotenv.config()


class SubtmitEmailUser{
 
  async sendEmailUsers(response: SubmitEmailUsersModel )
  {
    if(!response.email || !response.nome || !response.data || !response.hora || !response.servico)
    {
        throw new Error("Obrigatório o preenchimento de todos os campos")
    }

   const transporter = nodemailer.createTransport({
    
      host: 'smtp-relay.brevo.com',
            port: 587,
            secure: false,
            
            auth:{
                user: process.env.BREVO_USER,
                pass: process.env.BREVO_API_KEY
            }
     
   })

  const info = await transporter.sendMail({

    from: `"Ds Barber" <${"dsbarber11@gmail.com"}>`,
    to: response.email,
    subject: "Confirmação de Agendamento!",
    text: `Olá, ${response.nome} você possui um agendamento realizado na DS Barber para o dia ${response.data}`,
    html: `
     <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 25px; width: 100%; box-sizing: border-box;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
    <h2 style="color: #528a14; text-align: center; margin-bottom: 20px;">✅ Horário Confirmado com sucesso!</h2>
    
    <p style="font-size: 16px; color: #555555; line-height: 1.5;">
      Olá, <b>${response.nome}</b>, seu agendamento realizado em nosso site foi confirmado com sucesso.  
      Caso precise reagendar ou cancelar, visite nosso site ou entre em contato via WhatsApp.
    </p>

    <div style="margin: 20px 0; padding: 15px; background-color: #f1f1f1; border-radius: 8px;">
      <p style="font-size: 16px; color: #333333; margin: 5px 0;">
        📅 <b>Data:</b> ${response.data}
      </p>
      <p style="font-size: 16px; color: #333333; margin: 5px 0;">
        ⏰ <b>Horário:</b> ${response.hora}
      </p>
      <p style="font-size: 16px; color: #333333; margin: 5px 0;">
        🧑‍💼 <b>Serviço:</b> ${response.servico}
      </p>
    </div>

    <p style="font-size: 14px; color: #777777; margin-top: 20px;">
      Agradecemos pela preferência! 💈  
      Ds Barber
    </p>
  </div>
</div>

      `,
  })


  return info;


  }
    


}

export default new SubtmitEmailUser()