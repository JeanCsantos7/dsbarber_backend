

import AgendaModel from "../model/agenda";
import HorariosMarcadosModel from "../model/horariosMarcados";
import AgendaRepositorie from "../repositories/agenda";


class AgendaService {
  async createHours( id_data: number, horas: string) {

    if (!horas || !id_data) {
      throw new Error("Dados incompletos");
    }

    const getHour = await AgendaRepositorie.getHours(id_data, horas);
 


    if(getHour.length > 0)
   {
    throw new Error("Horário já cadastrado");
   }
  
    const result  = await AgendaRepositorie.createHours(id_data, horas);

  
    
  
    


   

      return result
  }


 async getAllDate()
  {
    const result = await AgendaRepositorie.getAllDate();
    if(result.length === 0)
    {
      throw new Error("Nenhuma data cadastrada");
    }
    return result;
  }

   async getFreeDates()
  {

    const result = await AgendaRepositorie.getFreeDates();
    if(result.length === 0)
    {
      throw new Error("Nenhuma data cadastrada");
    }
    return result;
  }


  async getHours(id_data: number, hour: string)
  {
  

    const result = await AgendaRepositorie.getHours(id_data, hour);

    
    
    
    if(result.length === 0)
    {
      throw new Error("Nenhum horário cadastrado");
    }

   
    return result;
  }


 async getAllHours(){
   const result = await AgendaRepositorie.getAllHours();
   if(result.length === 0)
   {
     throw new Error("Nenhum horário cadastrado");
   }
   return result;
 }

  async createDate(date: string) {
    if (!date) {
      throw new Error("Dados incompletos");
    } 

    const resultDate : any = await AgendaRepositorie.createDate(date);
   


  
  


    return {resultDate, id_datas: resultDate.insertId}


  }


  
  
 
  async createAgendamento(agenda: AgendaModel) {

    if (!agenda.nomecliente || !agenda.servico || !agenda.hora || !agenda.data) {
      throw new Error("Dados incompletos");
    }

    const result = await AgendaRepositorie.createAgendamento(agenda);
    return result;
  }

  async getAgendamentos() {

    const result = await AgendaRepositorie.getAgenda();
    if(result.length === 0)
    {
      throw new Error("Nenhum agendamento encontrado");
    }
    return result;
  }

  async getAgendaById(id_data: number, status: string) {
    
    if(!id_data || !status)
    {
      throw new Error("ID  ou status não informados");
    }

    const result = await AgendaRepositorie.getAgendaById(id_data, status);
    if(result.length === 0)
    {
      throw new Error("Não há horários disponíveis");
    }

    
    return result;
  }

 async getFreeAgendamentos(status: string) {
  if (!status || status !== "Livre") {
    throw new Error("Status não informado ou inválido");
  }

  const result = await AgendaRepositorie.getFreeAgendamentos(status);

  if (result.length === 0) {
    throw new Error("Nenhum agendamento livre encontrado");
  }


  const filtered = result.filter(r => r.status === "Livre");

  return filtered;
}

  

   async getMarkedAgendamentos(status: string)
  {
    
      if(!status || status !== "Marcado")
    {
      throw new Error("Status não informado ou inválido");
    }
    
    const result = await AgendaRepositorie.getMarkedAgendamentos(status);
    
  
    
    if(result.length === 0)
    {
      throw new Error("Nenhum agendamento livre encontrado");
    }
    return result;
  }

  async detailsAgendamento(id_horas: number) {
    if(!id_horas)
    {
      throw new Error("ID não informado ou não existente");
    }

    const result = await AgendaRepositorie.detailsAgendamento(id_horas);
    if(result.length === 0)
    {
      throw new Error("Nenhum agendamento encontrado");
    }
    return result;
  }

  async updateHorarios( data: string, horas: string, id_horas: number) { 
     
    if( !data || !horas)
    {
      throw new Error("Dados incompletos");
    }

    const result = await AgendaRepositorie.updateHorarios( data, horas, id_horas);
     if(result.length === 0)
     {
      throw new Error("Nenhum agendamento encontrado");
     }
      return result;

  }





  async deleteAgendamento(data: HorariosMarcadosModel) {
  if(!data.id_horas) {
    throw new Error("ID não informado ou não existente");
  }

  const result = await AgendaRepositorie.deleteAgendamento(data);
  if(result.affectedRows === 0) {
    throw new Error("Nenhum agendamento encontrado");
  }



}



}
export default new AgendaService();
