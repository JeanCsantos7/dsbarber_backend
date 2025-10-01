import { Request, Response } from "express";
import AgendaService from "../service/agenda";


class AgendaController {
  async createHour(req: Request, res: Response) {
    try {
      const {id_data, horas} = req.body;

      const result = await AgendaService.createHours(id_data, horas);
      res.status(200).json(result);
    } catch (error: any) {
 

      return res.status(400).json({
        sucess: false,
        message: error.message 
      
      });
    }
  }

 async getAllDate(req: Request, res: Response)
  {
    try {
       

      const data = await AgendaService.getAllDate();
      res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }


  async getHours(req: Request, res: Response)
  {
    try {
       
      const{id_data, horas} = req.params
      const data = await AgendaService.getHours(parseInt(id_data), horas);
      res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }


  async getAllHours(req: Request, res: Response)
  {
    try {
      const data = await AgendaService.getAllHours();
      res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }

  async getFreeDates(req: Request, res: Response){
    try {
     
      const data = await AgendaService.getFreeDates();
      res.status(200).json(data);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }


   async createDate(req: Request, res: Response) {
    try {
      const {data} = req.body;
      const result = await AgendaService.createDate(data);
      res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }




  async createAgendamento(req: Request, res: Response) {
    try {
      const data = req.body;
      const result = await AgendaService.createAgendamento(data);
      res.status(200).json(result);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message || "Erro",
      });
    }
  }

  async getAgendamentos(req: Request, res: Response) {
   
    
   try {
     const data = await AgendaService.getAgendamentos();
    res.status(200).json(data);

   } catch (error: any) {
     return res.status(400).json({
       sucess: false,
       message: error.message || "Erro",
     });
   }
  
   
  }

async getAgendamentosById(req: Request, res: Response) {
  try {
    const { id_data, status } = req.params;
    const data = await AgendaService.getAgendaById(parseInt(id_data), status);
    res.status(200).json(data);
  } catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message || "Erro",
    });
  }
}


  async getFreeAgendamentos(req: Request, res: Response){
   
  try{

  const {status} = req.params;
    const agenda = await AgendaService.getFreeAgendamentos(status);
    res.status(200).json(agenda);
  }

  catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message || "Erro",
    });
  }

  
  }


   async getMarkedAgendamentos(req: Request, res: Response){
   
  try{

  const {status} = req.params;
    const agenda = await AgendaService.getMarkedAgendamentos(status);
    res.status(200).json(agenda);
  }

  catch (error: any) {
    return res.status(400).json({
      sucess: false,
      message: error.message || "Erro",
    });
  }

}

async detailsAgendamento(req: Request, res: Response ){

  try {
    
   const {id_horas} = req.params
    const data = await AgendaService.detailsAgendamento(parseInt(id_horas));
    res.status(200).json(data);
  
  } catch (error: any) {
    return res.status(400).json({
     sucess: false,
     message: error.message || "Erro",
    })
  }
}


async updateHorarios(req: Request, res: Response ){

   try {
     const {id_horas} = req.params;
     const response = req.body;
     const data = await AgendaService.updateHorarios( response.data, response.horas, parseInt(id_horas));
     res.status(200).json(data);

    
   } catch (error: any) {
    
      return res.status(400).json({
        sucess: false,
        message: error.message || "Error",
      })
   }

}


async deleteAgendamento(req: Request, res: Response ){

  try {

    const params = req.params
    const data = await AgendaService.deleteAgendamento(params as any);
    res.status(200).json(data);
  }

  catch (error: any) { 

    return res.status(400).json({
     sucess: false,
     message: error.message || "Erro",
   });
  }

}  
}

export default new AgendaController();
