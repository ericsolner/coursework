# Checkpoint 2

In this second installment of the checkpoint series, we explore some other helpful tools and techniques to help you improve your JavaScript.

## Vital Array and String Methods
### Array 
[forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), [map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce), [sort](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice), [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join), [pop](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop), [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

### String
[charAt](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt), [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat), [indexof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf), [replace](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace), [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice), [split](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split), [substr](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substr), [substring](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring), [toLowercase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase), [toUppercase](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase), [trim](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim)

## Inquirer
Be comfortable collecting data from the command line via

```js
var inquirer = require("inquirer");

inquirer.prompt([
    {
        name: "age",
        type: "input",
        message: "input",
    }
]).then(function (answers) {

    // all responses will be available via the
    // answers parameter
    console.log(answers.age);
});
```
Want to do more? Check out the [docs](https://www.npmjs.com/package/inquirer).

## Constructors and Prototypes
Constructors are used to create objects. They usually take the form of a function:

```js
function Burger(name, price) {
    // assign the values that come in as
    // parameters (inputs) to the newly
    // created objects 
    this.name = name;
    this.price = price;
}
```
To create a new object, we have to use the `new` keyword and the name of the constructor.

```js
var cheeseBurger = new Burger("cheese", 15.99);
```

The `prototype` chain represents the inheritance between objects. Consider the following:

```js
var foo = {};
console.log(foo.a); // undefined
```
The ouput will be undefined, but foo will check the entire protype chain to find the property `a`. If it can't find it, then it'll return `undefined`. Learn more [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype).

*NOTE `prototype` is a more advanced topic and you should take care to slowly digest this content*

## Module Exports
In order to share values between files in node, we use `module.exports` and `require`. This pattern allows us to make our code more _module_. Module code can be shared between projects and platforms.

### Export properties
```js
// in rapper.js, define the constructor
// Export a constructor
function Rapper(stageName, genre) {
    ...
}

module.exports = Rapper;

// ------------------------------------
// in app.js, import it like this:
var Rapper = require("./rapper.js");
```

We can export all kinds of things, like `functions`, `objects`, `arrays`, `strings` etc.

#### Export a function
```js
// Export a function
function add(a, b) {
    ...
} 

module.exports = add;
```
#### Export an object
```js
var obj = {
    a: "hello",
    b: "world"
};

module.exports = obj;
```

#### Export multiple values
```js
module.exports = {
    add: function (a, b) {
        ...
    },
    obj: {
        a: "hello",
        b: "world"
    }
    ...
};
```
This is one way to accomplish this goal.

## Callbacks
Callbacks are a function that are called after some task is completed. We've seen this in places such as `setTimeout` and `setInterval`.

```js
setTimeout(function () {
    console.log("I am a callback");
}, 1000);
```

Behind the scenes, it look something like this:

```js
function iTakeCallbacks(callbackFn) {
    // do something...
    // now that I'm done, call the callback
    callbackFn();
}

iTakeCallbacks(function () {
    console.log("When it's time for the callback, I'll be displayed!");
});
```