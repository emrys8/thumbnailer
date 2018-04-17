import debug from 'debug';
import server from './server';
debug('app:server');

const port = parseInt(process.env.PORT || 3000);
server
 .start(port)
  .then((server) => {
      // Use DEBUG module here later
      debug(`Application server started on http://localhost:${port}`);
  })
  .catch(err => {
     debug(err.message);
  });