import horariosMarcados from "../repositories/horariosMarcados";
import HorariosMarcadosModel from "../model/horariosMarcados";


class HorariosMarcados
{ 
 async create(data: HorariosMarcadosModel)
 {
   if(!data.id_horas || !data.nomecliente || !data.telefone || !data.servico || !data.data || ! data.hora)
   {
    throw new Error("O preenchimento de todos os dados são obrigatórios!")
   }

  


 

 }

 async getHorariosByName(name: string) {
   if (!name) {
     throw new Error("O nome do cliente é obrigatório!");
     
   }

   const result = await horariosMarcados.getHorariosByName(name);
   if(result.length === 0) {
      throw new Error("Nenhum horário encontrado para o cliente!");
   }

   return result;
 }

 async cancelHorariosAdm(id_marcados: number, data: HorariosMarcadosModel) {
   
    if (!id_marcados) {
      throw new Error("ID do agendamento é obrigatório!");  

    }

    const result = await horariosMarcados.cancelHorariosAdm(id_marcados, data);
     if(!result || result.affectedRows === 0) {
      throw new Error("Nenhum agendamento encontrado com o ID fornecido!");
   }
  }


   async cancelHorariosUser(id_marcados: number, data: HorariosMarcadosModel) {

    if (!id_marcados) {
      throw new Error("ID do agendamento é obrigatório!");

    }

    

    const result = await horariosMarcados.cancelHorariosUser(id_marcados, data);
  
 
    if(!result || result.affectedRows === 0) {
      throw new Error("Nenhum agendamento encontrado com o ID fornecido!");
   }

  

  return result;

}
}

export default new HorariosMarcados();