import express from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { config } from 'dotenv';
import thumbnailAPI from '../api/thumbnailer';

config();

const start = (port) => {
    return new Promise((resolve, reject) => {
        if (!port) {
            reject(new Error('The server must be started with an available port'));
        }

        const app = express();
        app.set('json spaces', 2);

        if (app.get('env') == 'development') {
            app.use(logger('dev'));
        }
        app.use(helmet());
        app.use(compression());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use((err, req, res, next) => {
            reject(new Error('Something went wrong!, err:' + err));
            res.status(500).send('Something went wrong!');
        });

        thumbnailAPI(app);

        const server = app.listen(port, () => resolve(server));
    });
}

export default Object.assign({}, {start});