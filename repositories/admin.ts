import { RowDataPacket } from "mysql2";
import AdminModel from "../model/admin";
import connect from "../database/connection";

class AdminRepositorie
{
  async getAdminByEmail(email: string) : Promise<RowDataPacket[]>  {

     const sql = "SELECT email, senha, role FROM barbeiro WHERE email = ?"
     const[rows] = await connect.query<RowDataPacket[]>(sql, [email]);
     return rows;


  }
  


}

export default new AdminRepositorie;