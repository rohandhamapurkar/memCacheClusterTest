var Memcached = require('memcached');
var memcached = new Memcached('127.0.0.1:11211');
memcached.touch('foo',function (err) { 
  console.log("done")
  memcached.add('foo', {lol:true}, 10, function (err) { 
    console.log("Object saved {lol:true}");
    memcached.get('foo', function (err, data) {
      console.log("Printing data retrieved");
      console.log(data);
      console.log("Printing type of data :"+typeof data)
    });
  });
  
});


const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const event = require('events');

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork({env:i});
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
    require('./server');
  console.log(`Worker ${process.pid} started`);
}