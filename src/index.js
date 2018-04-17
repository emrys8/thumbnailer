import server from './server';

const port = parseInt(process.env.PORT || 3000);
server
 .start(port)
  .then((server) => {
      // Use DEBUG module here later
      console.log(`Application server started on http://localhost:${port}`);
  })
  .catch(err => {
      console.error(err.message);
  });


