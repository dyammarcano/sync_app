const crc32 = require('js-crc').crc32;
const request = require('request');
const Rx = require('rx');
const network = require('os').networkInterfaces();
const moment = require('moment');

moment().format();

const config = {
  server: "http://api.node05.comxa.com",
  seconds: 3600000
}

const options = {
  url: config.server,
  method: 'POST',
  headers: {
    'User-Agent': 'Super Agent/0.0.1',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    address: network.eth0[0].address,
    mac: network.eth0[0].mac,
    family: network.eth0[0].family,
    netmask: network.eth0[0].netmask,
    crc: crc32(network.eth0[0].mac).toUpperCase(),
    local_time: moment().unix(),
    info: "control de asistencia hotel eurobuilding",
    type: 'synchronization'
  }
};

setInterval(() => {
  console.log(`sync is now running intervals of ${config.seconds} miliseconds`);
  const options = {
    url: config.server,
    method: 'POST',
    headers: {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
      address: network.eth0[0].address,
      mac: network.eth0[0].mac,
      family: network.eth0[0].family,
      netmask: network.eth0[0].netmask,
      crc: crc32(network.eth0[0].mac).toUpperCase(),
      local_time: moment().unix(),
      info: "control de asistencia hotel eurobuilding",
      type: 'synchronization'
    }
  };
  request(options, function(err, response, body) {
    if (err) {
      console.log(error);
    }
    if (response.statusCode === 200) {
      if (response.headers['content-type'] === 'application/json') {
        let state = JSON.parse(body);
        console.log('device: ' + options.form.crc + ' sync to: ' + config.server + ' ' + state.saved);
      } else {
        console.log(body);
      }
    }
  });
}, config.seconds);

/*var sync = Rx.Observable.create((observer) => {
  request(options, (err, response, body) => {
    if (err) {
      observer.onError();
    } else {
      observer.onNext({
        response: response,
        body: body
      });
    }
    observer.onCompleted();

    () => {
      console.log(`task started:`);
    }

  });
});

var subscription = sync.subscribe((data) => {
  console.log(`run task: ${data}`);
});*/
