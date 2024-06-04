module.exports = {
  async up(db, client) {
    await db.createCollection('objects');
  },

  async down(db, client) {
    await db.collection('objects').drop();
  }
};