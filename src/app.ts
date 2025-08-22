import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import employeesRouter from './routes/employees';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Swagger setup
const swaggerDocument = YAML.load(path.join(__dirname, './swagger/swagger.yaml'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Routes
app.use('/api/employees', employeesRouter);

app.get('/', (req, res) => {
  res.redirect('/api-docs');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API documentation available at http://localhost:${port}/api-docs`);
});