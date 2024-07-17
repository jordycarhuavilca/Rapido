module.exports = {
  async up(db, client) {
    await db.createCollection('folders');
  },

  async down(db, client) {
    await db.collection('folders').drop();
  }
};
