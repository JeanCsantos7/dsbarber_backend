import mysql from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config();

const connect = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "Sccp1910",
    port: 3306,
    database: "bd_dsbarber",
    connectionLimit: 15,
    waitForConnections: true,
  queueLimit: 0,
})


 async function connection() {
try {
    const connection = await connect.getConnection();
    console.log(" Conexão com o banco realizada com sucesso!");
    connection.release(); 
  } catch (error) {
    console.error(" Não foi possível se conectar ao banco:", error);
  }

}

connection()

export default connect;
