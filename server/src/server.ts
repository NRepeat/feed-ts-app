import express from 'express';
const cors = require('cors');
import { Request, Response } from 'express';

const bodyParser = express.json();
const app = express();
app.use(cors());
app.use(bodyParser);
app.use(express.static('public'));
app.get('/', (req: Request, res: Response) => {
  res.send('Application works!');
});


app.listen(3000, () => {
  console.log('Application started on port 3000!');
});
