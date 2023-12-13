import configDev from './config.development';
import configProd from './config.production';

export default process.env.NODE_ENV === 'production' ? configProd : configDev;
