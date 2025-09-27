
import UsersRepositories from "../repositories/users";
import UsersModel from "../model/users";
import bcrypt from "bcrypt"


class AuthUsers{
  
 async postUsers(user: UsersModel)
 { 
    if(!user.nome || !user.email || !user.telefone || !user.senha || !user.role) {
      throw new Error("Todos os campos são obrigatórios");

 }

 if(user.role != "user")
 {
    throw new Error("Apenas usuários com a permissão 'user' podem ser cadastrados");
 }

 const salts = 10;
 user.senha = await bcrypt.hash(user.senha, salts );

 const findByEmail = await UsersRepositories.getUsersByEmail(user.email);
 const findByName = await UsersRepositories.getUsersByName(user.nome);

 const emailExistente = findByEmail.find((emailUser) => emailUser.email === user.email);
 const nomeExistente = findByName.find((nameUser) => nameUser.nome === user.nome);

 if (emailExistente || nomeExistente) {
   throw new Error("Já existe um usuário cadastrado com estes dados");
 }

 return UsersRepositories.postUsers(user);

 




 




}






async getUsersByEmail(email: string)
 {
   
    if(!email)
    {
      throw new Error("É obrigátorio o preenchimento de um email ");
    }

    const result = await UsersRepositories.getUsersByEmail(email)

    if(result.length === 0)

    {
      throw new Error("Não há resultados para sua busca");
    }

    return result;

  
 }


 async getUsersByName(email: string)
 {
   
    if(!email)
    {
      throw new Error("É obrigátorio o preenchimento do email ");
    }

    const result = await UsersRepositories.getUsersByEmail(email)

    if(result.length === 0)

    {
      throw new Error("Não há resultados para sua busca");
    }

    return result;

  
 }







}
export default new AuthUsers();