import { Db } from 'mongodb';
module.exports = {
  async up(db: Db) {
    await db.createCollection('users');
  },

  async down(db: Db) {
    await db.collection('users').drop();
  }
};
