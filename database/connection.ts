import mysql from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config();

const connect = mysql.createPool({
    host: process.env.MYSQL_HOST || "localhost",
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || process.env.MYSQL_LOCALPASSWORD,
    port:  parseInt(process.env.MYSQL_PORT || "3306") ,
    database: process.env.MYSQL_DB || "bd_dsbarber",
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
