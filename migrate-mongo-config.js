const dotenv = require('dotenv');
dotenv.config()
module.exports = {
  mongodb: {
    // TODO Change (or review) the url to your MongoDB:
    url: process.env.MONGO_SRV,

    // TODO Change this to your database name:
    databaseName: process.env.DATABASE,
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: process.env.MIGRATION_DIR,

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: 'mongoMigrations',

  // The file extension to create migrations and search for in migration dir
  migrationFileExtension: process.env.MIGRATION_EXTENSION,

  // Enable the algorithm to create a checksum of the file contents and use that in the comparison to determine
  // if the file should be run.  Requires that scripts are coded to be run multiple times.
  useFileHash: false,

  moduleSystem: 'commonjs'
};