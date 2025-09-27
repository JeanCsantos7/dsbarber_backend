import { Request, Response } from "express";
import horariosMarcados from "../service/horariosMarcados";
import horariosMarcadosRepositorie from "../repositories/horariosMarcados";

class HorariosMarcados {
  async create(req: Request, res: Response) {
    try {
      const data = req.body;

      const response = await horariosMarcadosRepositorie.create(data);
      res.status(200).send(response);
    } catch (error: any) {
      return res.status(400).json({
        sucess: false,
        message: error.message,
      });
    }
  }

  async getHorariosByName(req: Request, res: Response) {
    const { nomecliente } = req.params;

    const response = await horariosMarcados.getHorariosByName(nomecliente);
    res.status(200).send(response);

    try {
      const { nomecliente } = req.params;
      const response = await horariosMarcados.getHorariosByName(nomecliente);
      res.status(200).send(response);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cancelHorariosAdm(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id_marcados } = req.params;
      const response = await horariosMarcados.cancelHorariosAdm(
        parseInt(id_marcados),
        data
      );
      res.status(200).send(response);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async cancelHorariosUser(req: Request, res: Response) {
    try {
      const data = req.body;
      const { id_marcados } = req.params;
      const response = await horariosMarcados.cancelHorariosUser(
        parseInt(id_marcados),
        data
      );
      res.status(200).send(response);
    } catch (error: any) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new HorariosMarcados();
