import app from './app';
import db from './database/db';
const PORT = process.env.SERVER_PORT;

async function run() {
  await db.connect();

  app.listen(PORT, () => {
    console.log(`the server is running on the port ${PORT}`);
  });
}

run();
