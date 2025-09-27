
import app from "./app"


const PORT = 5000;
const url = `http://localhost:${PORT}`;

 app.listen(PORT, () => {
  console.log(` Servidor está rodando na porta ${PORT}  `)
  console.log(`Aplicação rodando em ${url}`)
});

