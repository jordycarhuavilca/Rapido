module.exports = {
  MONGO_URL: process.env.MONGO_SRV,
  MONGO_DATABASE: process.env.DATABASE,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  SESSION_SECRET: process.env.SESSION_SECRET,
  MIGRATION_DIR: process.env.MIGRATION_DIR || './src/database/migrations',
  MIGRATION_EXTENSION: process.env.MIGRATION_EXTENSION || '.ts'
};