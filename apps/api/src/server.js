import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import orgRouter from './routers/orgRouter';
import projectRouter from './routers/projectRouter';

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use('/orgs', orgRouter);
app.use('/projects', projectRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running at port ${process.env.PORT || 4000}\nOrz`)
);
