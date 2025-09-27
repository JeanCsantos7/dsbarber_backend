
import AdminRepositories from "../repositories/admin";


class AdminService{

    async getAdminByEmail(email: string)
    {

    

     const consult = await AdminRepositories.getAdminByEmail(email)


     if(consult.length === 0)
     {
        throw new Error("Acesso  Incorreto!")

     }

     return consult;

    }

    

}

export default new AdminService();