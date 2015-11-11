# restartable-process
Spawn a process and provide a means to easily restart it

##Usage
```javascript
var Restartable = require('restartable-process');

// new Restartable(processName,args,options)
// start up a node process with the args 'my-app/index.js'
// and set the NODE_ENV environment variable.
// NOTE: the options object is identical to what you would
// pass when spawning a process using nodes built in spawn function
var process = new Restartable('node',['my-app/index.js'],{
  env: { NODE_ENV: 'production' }
});

// Start the process if it's not already started or restart it 
// if it is already started.
process.restart(function() {
  console.log('process restarted');
});
```
