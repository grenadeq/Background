var callfile = require('child_process'); 

callfile.execFile('./run.sh',null,function (err, stdout, stderr) {
    if (err!== null) {
          console.log('exec error: ' + err);
        }
    else if (stdout!=null)
	   console.log('stdout:'+stdout);
    else
          console.log('stderr'+stderr);

});
