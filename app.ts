import express from "express"
import cors from "cors"
import Rotas from "./Routes";
const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send('Bem-vindo à Rota principal');
  });

  app.use(Rotas)
  app.set('case sensitive routing', false);


export default app;
