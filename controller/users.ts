
import {Request, Response} from "express";
import UsersServices from "../service/users";
import UserRepositories from "../repositories/users";
import authUsers from "../service/authUsers";
class UsersController{

 async postUsers(req: Request, res: Response )
 {
  
  
  try {
    const dados = req.body;
    const result = await UsersServices.postUsers(dados);
    res.status(201).json(result);
  } 
  
  catch (error) {
       throw new Error(` ${error}`)
     
  }
    


    

 }

 

  async getUsersByEmail(req: Request, res: Response) {

  

  try {
     
    const {email} = req.params;
    const result = await UsersServices.getUsersByEmail(email);
    res.status(200).json(result);

  } catch (error) {
     throw new Error("Não foi Possível consultar o usuário")
  }
    
 

 }

 async getUsersByName(req: Request, res: Response){

 try {
   const {nome} = req.params;
   const result = await UsersServices.getUsersByName(nome);
   res.status(200).json(result)

 } 
 
 catch (error: any) {
    
  return res.status(400).json(
    {sucess: false,
     message: error.message
    }
  )

 }
 }

 async getUsers( req: Request, res: Response)
 {
  try {
    
   
    const result = await UserRepositories.getUsers()
    res.status(200).json(result)



    
  } catch (error: any) {
     
    return res.status(400).json({
      sucess: false,
      message: error.message
    })
  
  }

 }

async login(req: Request, res: Response){
  
  

  try {
    const data = req.body
  const result = await authUsers.authUsers(data)
  res.status(200).json(result)
  } 
  
  catch (error: any) {
   
    res.status(400).json({
      sucess: false,
      message: error.message
    })
  
  }

}


 


}


export default new UsersController();
