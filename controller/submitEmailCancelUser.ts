
import { Request, Response } from "express";
import submitEmailCancelUser from "../service/submitEmailCancelUser";



class SubmitEmailCancelUserController{

    async cancelarAgendamento(req: Request, res: Response){
     
        try {
            
          const data = req.body
          const response = await submitEmailCancelUser.cancelarAgendamentoUser(data)
          return res.status(200).json(response)

        } catch (error: any) {
            
          return res.status(500).json({sucess: false, message: error.message})

        }

    }

}

export default new SubmitEmailCancelUserController();