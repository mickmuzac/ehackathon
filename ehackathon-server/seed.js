module.exports = function(db) {

  db.Event.findOrCreate({
    where: {
      name: 'WeekendMVC'
    }
  }).then(function() {
    console.log('Events seeded!');
  });

};