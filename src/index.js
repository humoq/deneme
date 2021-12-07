import compression from 'compression';
import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

app.use(compression())
app.use(cors())
app.use(routes);

app.listen(process.env.PORT || 8000); 