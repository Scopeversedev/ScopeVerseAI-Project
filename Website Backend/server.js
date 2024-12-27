import {app} from './app.js';
import cron from 'node-cron';
import { fetchTopMovers } from './controllers/topMoverseController.js';

cron.schedule('*/15 * * * *', () => {
    fetchTopMovers();
    
  });
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => console.log('server running on port 4000'));