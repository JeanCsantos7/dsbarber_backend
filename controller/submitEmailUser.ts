import { Request, Response } from "express";
import submitEmailUserService from "../service/submitEmailUser";


class submitEmailUserController {
async sendBookingEmail(req: Request, res: Response) {

    try {
          const data = req.body;
          const response = await submitEmailUserService.sendEmailUsers(data)
          res.status(200).send("Email Enviado com sucesso")


    } catch (error: any) {

       return res.status(400).json({message: error.message})
    }   


}

}

export default new submitEmailUserController();   