import bcrypt from "bcrypt"
import UsersRepositories from "../repositories/users";
import UsersModel from "../model/users";
import jsonwebtoken from "jsonwebtoken";


class AuthUsers{
 
    
    async authUsers(user: UsersModel)
    {
     

     if(!user.email || !user.senha)
     {
        throw new Error("É necessário informar email e senha ");
     }


     
    const consult = await UsersRepositories.getUsersByEmail(user.email);
    const result = consult[0];

    const comparePassword = await bcrypt.compare(user.senha, result.senha);

    if(!comparePassword || result.length == 0)
    {
 
        throw new Error("Senha incorreta");
        
         
    }



  
    if(result.length == 0)
    {
        throw new Error("Email ou senha incorretos");
    }

    if(result.role != "user")
    {
        throw new Error("Você não tem permissão para realizar essa atividade");
    }

    const token = await jsonwebtoken.sign({
        id: result.id,
        nome: result.nome,
        emailCliente: result.email,
        telefone: result.telefone,
        role: result.role, 

    }, process.env.JWT_SECRET as string, {expiresIn: "1h"});

    return {token, id: result.id, nome: result.nome, telefone: result.telefone, emailCliente: result.email, role: result.role};

    


    }
    
    



}

export default new AuthUsers();