import { RowDataPacket } from "mysql2";
import connect from "../database/connection";
import AgendaModel from "../model/agenda";
import HorariosMarcadosModel from "../model/horariosMarcados";


class AgendaRepositorie {
  async createHours(id_data: number, hour: string) {
    const sql = "INSERT INTO horarios ( id_data, horas ) VALUES (?, ?)";
  

    const [result] = await connect.execute(sql, [
    
      id_data,
      hour, 
      
    
    ]);
    return result;
  }

   async createDate(date: string)  {   {
    const sql = "INSERT INTO datas ( data ) VALUES (?) ";
    const [result] = await connect.query(sql, [
      date,
    ]);
    return result;
  }

}

async getAllDate()  : Promise<RowDataPacket[]>
 {
     const sql = "SELECT id_datas, data FROM datas ";
     const [ rows ] = await connect.query<RowDataPacket[]>(sql);
     return rows;

 }


async getFreeDates(): Promise<RowDataPacket[]> {
  const sql = `
    SELECT DISTINCT d.id_datas, d.data
    FROM datas d
    INNER JOIN horarios h ON h.id_data = d.id_datas
    WHERE h.status = 'Livre'
    ORDER BY d.data ASC
  `;
  const [rows] = await connect.query<RowDataPacket[]>(sql);
  return rows;
}




 async getHours(id_data: number, hours: string)  : Promise<RowDataPacket[]>
 {
     const sql = "SELECT id_data, horas FROM horarios WHERE id_data = ? AND horas = ?";
     const [ rows ] = await connect.query<RowDataPacket[]>(sql, [id_data, hours]);
     return rows;

 }

 


  async getAllHours()  : Promise<RowDataPacket[]>
 {
     const sql = "SELECT id_data, horas FROM horarios"
     const [ rows ] = await connect.query<RowDataPacket[]>(sql);
     return rows;

 }

   async getAgenda(): Promise<RowDataPacket[]> {
   
    const sql = "SELECT id_horas, id_data, horas, data FROM horarios INNER JOIN datas ON datas.id_datas = horarios.id_data  ";
    const [rows] = await connect.query<RowDataPacket[]>(sql);
    return rows;


  }

  async getFreeAgendamentos(status: string): Promise<RowDataPacket[]>
  {

    const sql = "SELECT id_horas, id_data, horas, data, status FROM horarios INNER JOIN datas ON datas.id_datas = horarios.id_data WHERE status = 'Livre' ";
    const [rows] = await connect.query<RowDataPacket[]>(sql, [status]);
    return rows;
  }

  async getAgendaById(id_data: number, status: string): Promise<RowDataPacket[]> {
    const sql = "SELECT id_horas, id_data, horas, data, status FROM horarios INNER JOIN datas ON datas.id_datas = horarios.id_data WHERE id_data = ? AND status = ? ";
    const [rows] = await connect.query<RowDataPacket[]>(sql, [id_data, status]);
    return rows;
  }

  async getMarkedAgendamentos(status: string)
  {
    const sql = `
  SELECT 
    h.id_horas AS horario_id,
    h.id_data,
    h.horas,
    d.data,
    hm.id_marcados,
    hm.id_horas
  FROM horarios h
  INNER JOIN datas d ON d.id_datas = h.id_data
  INNER JOIN horariosmarcados hm ON hm.id_horas = h.id_horas
  WHERE h.status = ?;
`;

    const [rows] = await connect.query<RowDataPacket[]>(sql, [status]);
    return rows;
  }


  async createAgendamento(agenda: AgendaModel) {
    const sql = "INSERT INTO horariosmarcados (nomecliente, servico, hora, data) VALUES (?, ?, ?, ?)";
    const [result] = await connect.query(sql, [
      agenda.nomecliente,
      agenda.servico,
      agenda.hora,
      agenda.data,
    
    ]);
    return result;
  }

  async detailsAgendamento(id_horas: number): Promise<RowDataPacket[]> {
     const sql = `
  SELECT 
    h.id_horas AS horario_id,
    h.id_data,
    h.horas,
    d.data,
    hm.id_marcados,
    hm.nomecliente,
    hm.servico, 
    hm.telefone,
    hm.id_horas 
  FROM horarios h
  INNER JOIN datas d ON d.id_datas = h.id_data
  INNER JOIN horariosmarcados hm ON hm.id_horas = h.id_horas
  WHERE h.id_horas = ?;
`;

    
    const [rows] = await connect.query<RowDataPacket[]>(sql, [id_horas]);
    return rows;
  }

async updateHorarios( data: string, horas: string, id_horas: number) : Promise<RowDataPacket[]> {

  const sql = "UPDATE horarios INNER JOIN datas ON datas.id_datas  = horarios.id_data SET datas.data = ?, horarios.horas = ? WHERE horarios.id_horas = ? ";
  const [result] = await connect.query<RowDataPacket[]>(sql, [ data, horas, id_horas]);
  return result;

}





  async deleteAgendamento(data: HorariosMarcadosModel) : Promise<any> {
    const sql = "DELETE FROM horarios WHERE id_horas = ?";
    const [result] = await connect.query<RowDataPacket[]>(sql, [data.id_horas]);
    return result;
   


}

}

export default new AgendaRepositorie();
