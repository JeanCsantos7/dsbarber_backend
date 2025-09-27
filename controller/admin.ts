import { Request, Response } from "express";
import AdminService from "../service/admin";
import AuthAdmin from "../service/authAdmin";

class Admin{

async getAdminByEmail(req: Request, res: Response)
{
 
    try {
        const {email} = req.params;
        const result = await AdminService.getAdminByEmail(email)
        res.status(200).json(result)
    } 
    
     catch (error) {
          throw new Error(` ${error}`) 
    }

}

async login(req: Request, res: Response)
{
 
    try {
        const data = req.body;
        const result = await AuthAdmin.authAdmin(data);
        res.status(200).json(result);
     
  
    } 
    
     catch (error: any) {
      
        return res.status(400).json({
            sucess: false,
            message: error.message || "Erro",
        }) 
      
    }


}

}

export default new Admin();