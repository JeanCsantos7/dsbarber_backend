import { RowDataPacket } from "mysql2";
import connect from "../database/connection";
import HorariosMarcadosModel from "../model/horariosMarcados";

class HorariosMarcados {
  async create(data: HorariosMarcadosModel) {
    const insertSql = `
      INSERT INTO horariosmarcados (id_horas, nomecliente, emailcliente, telefone, servico, data, hora)
      VALUES (?, ?, ?, ?, ?,?,?)
    `;
    const [insertResult]: any = await connect.query(insertSql, [
      data.id_horas,
      data.nomecliente,
      data.emailcliente,
      data.telefone,
      data.servico,
      data.data,
      data.hora,
    ]);

    if (!insertResult) {
      return null;
    }

    const updateSql = `
      UPDATE horarios INNER JOIN datas ON datas.id_datas = horarios.id_data SET status = 'Marcado' WHERE id_horas = ?
    `;
    const [updateResult]: any = await connect.query(updateSql, [data.id_horas]);

    return updateResult;
  }

  async getHorariosByName(name: string): Promise<RowDataPacket[]> {
    const sql =
      "SELECT id_marcados, id_horas, nomecliente, telefone, servico, data, hora FROM horariosmarcados WHERE nomecliente = ?";
    const [result]: any = await connect.query<RowDataPacket[]>(sql, [name]);
    return result;
  }

  async cancelHorariosAdm(id_marcados: number, data: HorariosMarcadosModel) {
    const deleteSql = "DELETE FROM horariosmarcados WHERE id_marcados = ?";
    const [result]: any = await connect.query(deleteSql, [
      id_marcados,
      data.id_horas,
    ]);
    if (!result) {
      throw new Error("Nenhum agendamento encontrado com o ID fornecido!");
    }

    const updateSQL = `UPDATE horarios SET status = "Livre" WHERE id_horas = ?`;
    const [resultUpdate]: any = await connect.query(updateSQL, [data.id_horas]);

    return resultUpdate;
  }

  async cancelHorariosUser(
    id_marcados: number,
    data: HorariosMarcadosModel
  ): Promise<any> {
    const deleteSql = "DELETE FROM horariosmarcados WHERE id_marcados = ?";
    const [result]: any = await connect.query<any>(deleteSql, [id_marcados]);

    if (!result) {
      throw new Error("Nenhum agendamento encontrado com o ID fornecido!");
    }

    const updateSQL = `UPDATE  horarios INNER JOIN datas ON datas.id_datas = horarios.id_data SET status = "Livre" WHERE id_horas = ?`;
    const [resultUpdate]: any = await connect.query(updateSQL, [data.id_horas]);

    return resultUpdate;
  }
}
export default new HorariosMarcados();
