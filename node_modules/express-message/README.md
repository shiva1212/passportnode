
express-message
==========

***Express Message***
Queue based async message routing library


## Install

Stable Release (`1.0.x`)

```sh
$ npm install express-message --save
```


## Simple Usage

```javascript

const expressMessage = require('express-message');
const app = new expressMessage();

/* Validate */
app.handle( {}, async (message) => {
    if( !message.jsonrpc ){
        return message.error = {code: 100, message: "Invalid jsonRpc protocol"}
    }
});

app.handle( { method : "add" }, async (message) => {
    message.result = message.params[1].toString() + message.params[0].toString();
});


const messages = [
    { "method": "add", "params": [23, 42]},
    {"jsonrpc": "2.0", "method": "subtract", "params": [5, 3]},
    {"jsonrpc": "2.0", "method": "add", "params": [18, 8]}
];

messages.forEach( message => {
    app.emit(message)
});

// because of library works asynchronously
setTimeout(() => {
    console.log(messages)
},100);

```

### Matching

express-message uses  [jpv](url=https://www.npmjs.com/package/jpv/) as a matcher.

Here are some examples.  
Regular Expression  ``` app.handle( { jsonrpc : /[12]+\.[\d]/ } ```  
Native Types ``` { jsonrpc : "2.0", params : "(object)", timestamp : "(number))" } ```    
Custom Types ``` { jsonrpc : [float], email : "[email]",  } ```  
Logical negation : ``` { jsonrpc : !(boolean) } ```

For more information please check JPV official npm repository


### Implementation


Kafka implementation

```javascript

const expressMessage = require('express-message');
const app = new expressMessage();

// here are your hendlers
app.handle( { method : "add" }, async (message) => {
     /// 
});

// ... 

// your kafka consumer 
consumer.on('message', function (message) {
    app.emit(message);
});

```

Redis implementation

```javascript

const expressMessage = require('express-message');
const app = new expressMessage();

// here are your hendlers
app.handle( { method : "add" }, async (message) => {
     /// 
});

// ... 

// your redis subscriber
subscriber.on("message", function (channel, message) {
    app.emit(message);
});

```

 




