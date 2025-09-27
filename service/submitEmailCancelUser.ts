import SubmitEmailCancelUser from "../model/submitEmailCancelUser";
import nodemailer from 'nodemailer';

class submitEmailCancelamentoUserService{

    async cancelarAgendamentoUser(response: SubmitEmailCancelUser){

      

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: process.env.GOOGLE_EMAIL_ADMIN,
                pass: process.env.GOOGLE_APP_PASSWORD 
            }
        })

        const info = transporter.sendMail({
            from: "jean.carlosgvds48@gmail.com",
            to: "jean.carlosgvds48@gmail.com",
            subject: "Cancelamento de Agendamento!",
             html: `
      <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 25px; width: 100%; box-sizing: border-box;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <h2 style="color: #528a14; text-align: center;">Cancelamento de Agendamento!</h2>
          <p style="font-size: 16px; color: #555555;">Olá, Duh!</p>
          <p style="font-size: 16px; color: #555555;">Infelizmente, o cliente <b>${response.nomecliente}</b> realizou o cancelamento de um agendamento no dia <b>${response.data}</b> às <b>${response.hora}</b>.</p>
          <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">


          
        </div>
      </div>
      `
                
        })

        return info;
        

    }

}

export default new submitEmailCancelamentoUserService();