var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var all_dependencies = [];
var dependencies_not_installed = [];
var responseCount = 0;

var content= JSON.parse(fs.readFileSync('sample.json'));
all_dependencies = Object.keys(content.dependencies);

function showOutput(){
  if(dependencies_not_installed.length == 0){
    console.log("success");
  } else {
    for(let dependency of dependencies_not_installed){
      console.log(dependency);
    }
  }
  process.exit(0);
}


all_dependencies.forEach(function(key, index)
{
  let str = key+'=='+content.dependencies[key];
  exec("pip install "+ str, function(error, stdout, stderr){
    responseCount++;
    if(error){
      dependencies_not_installed.push(str)
    }
    if(responseCount == (all_dependencies.length - 1)){
      showOutput();
    }
  });
});

