import Sails from 'sails';

// Global before hook
before(done => {
  // Lift Sails with test database
  Sails.lift({
    log: {
      level: 'error'
    },
    models: {
      connection: 'test',
      migrate: 'drop'
    }
  }, done);
});

// Global after hook
after(done => Sails.lower(done));
