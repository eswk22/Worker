var loadfromString = require('require-from-string');

var actiontask = loadfromString("function test(data) { console.log(data) } module.exports = { test : test }");
console.log("Hello World");
process.on('message', function (message) {
    console.log(message);
    // var s = Math.floor(Math.random()*2001);
    // var e = new Date().getTime() + (s);
    // while (new Date().getTime() <= e) {
    //     ;
    // }
   actiontask.test("Eswar");

    if (message === 'hello') {
        process.send('world');
    }
});

process.on('feedParameters',function(value){

});