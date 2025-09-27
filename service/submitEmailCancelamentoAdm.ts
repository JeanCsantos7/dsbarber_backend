import SubmitEmailCancelAdm from "../model/submitEmailCancelAdm";
import nodemailer from 'nodemailer';

class submitEmailCancelamentoAdmService{
  
    async cancelarAgendamentoAdm(response: SubmitEmailCancelAdm){
      
      

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GOOGLE_EMAIL_ADMIN,
                pass: process.env.GOOGLE_APP_PASSWORD 
            }
        })

        const info = transporter.sendMail({
            from: `"Ds Barber" <${process.env.GOOGLE_EMAIL_ADMIN}>`,
            to: "jean.carlosgvds48@gmail.com",
            subject: "Cancelamento de Agendamento!",
             html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 25px; width: 100%; box-sizing: border-box;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #528a14; text-align: center;">Cancelamento de Agendamento!</h2>
          <p style="font-size: 16px; color: #555555;">Olá, ${response.nomecliente}!</p>
          <p style="font-size: 16px; color: #555555;">Infelizmente, seu agendamento para o dia <b>${response.data}</b> às <b>${response.horas}</b> precisou ser cancelado. Caso tenha dúvidas, entre em contato conosco</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">


          <p style="font-size: 14px; color: #777777;"><b>Mensagem do barbeiro:</b> ${response.mensagem}</p>
        </div>
      </div>
      `
                
        })

        return info;
        

    }

}

export default new submitEmailCancelamentoAdmService();