const { app } = require('./src/app');
require('./src/db/connect');

const PORT = 3000;
app.listen(PORT, () => {
  console.log('Listening on port', PORT);
});

