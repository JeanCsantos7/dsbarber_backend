import { Router } from "express"
import dotenv from "dotenv"
import users from "./controller/users";
import admin from "./controller/admin";
import agenda from "./controller/agenda";
import horariosMarcados from "./controller/horariosMarcados";
import submitEmailControllerAdmin from "./controller/submitEmailAdmin"
import submitEmailControllerUser from "./controller/submitEmailUser";
import submitEmailCancelamentoAdm from "./controller/submitEmailCancelamentoAdm";
import submitEmailCancelamentoUser from "./controller/submitEmailCancelUser";





dotenv.config();

const Rotas = Router();

Rotas.post("/createUsers", users.postUsers )
Rotas.post("/Login", users.login)
Rotas.post("/LoginAdmin", admin.login)
Rotas.post("/createHours", agenda.createHour)
Rotas.post("/createDate", agenda.createDate)
Rotas.post("/createAgendamento", agenda.createAgendamento)
Rotas.post("/createHorariosMarcados", horariosMarcados.create)
Rotas.post("/submitEmailAdmin", submitEmailControllerAdmin.sendBookingEmailAdmin)
Rotas.post("/submitEmailUser", submitEmailControllerUser.sendBookingEmail)
Rotas.post("/submitEmailCancelAdm", submitEmailCancelamentoAdm.cancelarAgendamento)
Rotas.post("/submitEmailCancelUser", submitEmailCancelamentoUser.cancelarAgendamento)
Rotas.get("/getHours/:id_data/:horas", agenda.getHours)
Rotas.get("/getAllHours", agenda.getAllHours)
Rotas.get("/getAllDate", agenda.getAllDate)
Rotas.get("/getFreeDates", agenda.getFreeDates)
Rotas.get("/getAgendamentos", agenda.getAgendamentos)
Rotas.get("/getAgendamentosById/:id_data/:status", agenda.getAgendamentosById)
Rotas.get("/getFreeAgendamentos/:status", agenda.getFreeAgendamentos)
Rotas.get("/getMarkedAgendamentos/:status", agenda.getMarkedAgendamentos)
Rotas.get("/getUserByEmail/:email", users.getUsersByEmail)
Rotas.get("/getAdminByEmail/:email", admin.getAdminByEmail)
Rotas.get("/getUserByName/:nome", users.getUsersByName)
Rotas.get("/getUsers", users.getUsers)
Rotas.get("/getHorariosMarcadosByName/:nomecliente", horariosMarcados.getHorariosByName)
Rotas.get("/detailsAgendamento/:id_horas", agenda.detailsAgendamento)
Rotas.put("/updateHorarios/:id_horas", agenda.updateHorarios)
Rotas.delete("/cancelHorariosAdm/:id_marcados", horariosMarcados.cancelHorariosAdm)
Rotas.delete("/cancelHorariosUser/:id_marcados", horariosMarcados.cancelHorariosUser)
Rotas.delete("/deleteAgendamento/:id_horas", agenda.deleteAgendamento)

export default Rotas;

