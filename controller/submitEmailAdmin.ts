import { Request, Response } from "express";
import SubmitEmailService from "../service/submitEmailAdmin";


class SubmitEmailControllerAdmin {

  
 async sendBookingEmailAdmin(req: Request, res: Response) {
    try {
      const data = req.body;
     
      const response = await SubmitEmailService.sendBookingEmail(data);
       
        res.status(200).json(response);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
}

}

export default new SubmitEmailControllerAdmin();
