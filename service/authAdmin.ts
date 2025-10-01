import bcrypt from "bcrypt";
import AdminRepositorie from "../repositories/admin";
import AdminModel from "../model/admin";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

class AuthAdmin{

    async authAdmin(admin: AdminModel )
    {
        if(!admin.email || !admin.senha)
        {
            throw new Error("Informe Email e senha");
        }


        const consult = await AdminRepositorie.getAdminByEmail(admin.email);

        if(consult.length == 0)
        {
            throw new Error("Email ou senha Incorretos")
        }


        const find = consult[0];

        const comparePassword = await bcrypt.compare(admin.senha, find.senha);

        if(!comparePassword || consult.length ==0)
        {
            throw new Error("Senha Incorreta");
        }

        if(find.role != "admin")
        {
            throw new Error("Você não tem permissão para prosseguir!!");
        }

        const token = jsonwebtoken.sign({
           
            emailAdmin: find.email,
            role: find.role

        }, process.env.JWT_SECRET as string, {expiresIn: "1h"})

        return {token,  emailAdmin: find.email, role: find.role};

      

    }
}

export default new AuthAdmin();