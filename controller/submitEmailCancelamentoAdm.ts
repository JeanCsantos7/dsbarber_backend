import {Request, Response} from "express";  
import submitEmailCancelamentoAdm from "../service/submitEmailCancelamentoAdm";

class SubmitEmailCancelamentoAdm {
  
    async cancelarAgendamento(req: Request, res: Response){
       
        try {
            const data = req.body;
            const response = await submitEmailCancelamentoAdm.cancelarAgendamentoAdm(data)
        
            res.status(200).send(response)
        } 
        catch (error: any) {
            return res.status(400).json({sucess: false, message: error.message})
        }

    }

}

export default new SubmitEmailCancelamentoAdm();