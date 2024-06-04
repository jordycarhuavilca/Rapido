module.exports = {
  async up(db, client) {
    await db.createCollection('countries');
  },

  async down(db, client) {
    await db.collection('countries').drop();
  }
};