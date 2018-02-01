const app = require('app.js');
const portscanner = require('portscanner');

let testServer = {

  connect() {
    return new Promise((resolve) => {
      this.findAvailablePort().then((port)=> {
        let server = app.listen(port);
        resolve(server);
      }).catch((error) => {
        console.log(error);
      });
    });
  },

  findAvailablePort() {
    return portscanner.findAPortNotInUse(
      app.get('portFrom'),
      app.get('portTo'),
      '127.0.0.1'
    );
  }

};

module.exports = testServer;
