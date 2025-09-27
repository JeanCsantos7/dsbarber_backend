import Users from "../model/users";
import connect from "../database/connection";
import { RowDataPacket } from "mysql2";

class UsersRepositorie{

 async postUsers(users: Users)
 {
   const sql = "INSERT INTO users (nome, email, telefone, senha, role) VALUES (?,?,?,?,?) ";
   const [result] = await connect.query(sql, [users.nome, users.email, users.telefone, users.senha, users.role]);

   return result;

   


 }



  async getUsers()    {

    const sql = "SELECT id, nome, email, telefone, role, senha FROM users ";
    const[rows] = await connect.query(sql)
    return rows;
  
 }


 async getUsersByName(name: string) : Promise<RowDataPacket[]> {

    const sql = "SELECT id, nome, role FROM users WHERE nome = ?";
    const[rows] = await connect.query<RowDataPacket[]>(sql, [name])
    return rows
  
 }

  async getUsersByEmail(email: string) : Promise<RowDataPacket[]>{

    const sql = "SELECT id, nome, email, telefone, senha, role FROM users WHERE email=?";
    const[rows] = await connect.query<RowDataPacket[]>(sql, [email]);
    return rows;

 }



 

}

export default new UsersRepositorie();

