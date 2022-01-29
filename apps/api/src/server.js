import express from 'express';
import cors from 'cors';
import authRouter from './routers/authRouter';
import projectRouter from './routers/projectRouter';
import orgRouter from './routers/orgRouter';
import bugRouter from './routers/bugRouter';

const app = express();

app.use(express.json());

app.use(cors());

app.use(authRouter);
app.use('/org', orgRouter);
app.use('/project', projectRouter);
app.use('/bug', bugRouter);

app.listen(process.env.PORT || 4000, () =>
  console.log(`Server running at port ${process.env.PORT || 4000}\nOrz`)
);
