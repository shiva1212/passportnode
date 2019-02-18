
const expressMessage = require('../../express-message');
const app = new expressMessage();

/*
* Validate jsonRpc
*/

app.handle( {}, async (message) => {
    if( !message.jsonrpc || "2.0" !== message.jsonrpc ){
        return message.error = {code: 100, message: "Invalid jsonRpc protocol"}
    }
});

app.handle( { method : "subtract" }, async (message) => {
    message.result = message.params[1] - message.params[0];
});

app.handle( { method : "multiply" }, async (message) => {
    message.result = message.params[1] * message.params[0];
});

app.handle( { method : "concat" }, async (message) => {
    message.result = message.params[1].toString() + message.params[0].toString();
});

app.handle( { method : "add" }, async (message) => {
    message.result = message.params[1].toString() + message.params[0].toString();
});

const messages = [
    {"jsonrpc": "2.0", "method": "subtract", "params": [42, 23]},
    {"jsonrpc": "1.0", "method": "multiply", "params": [23, 42]},
    {"jsonrpc": "2.0", "method": "add", "params": [42, 23]},
    {"jsonrpc": "2.0", "method": "concat", "params": ["bar", 5] },
];

messages.forEach( message => {
    app.emit(message)
});

// because of library calls asynchronously
setTimeout(() => {
    console.log(messages)
},100);
