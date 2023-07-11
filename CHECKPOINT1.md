# Checkpoint 1
Here are _*some of*_ the essential skills in JavaScript and JQuery up to this point. This list is not exhaustive by any means. Please review the code examples from class if you need more details. This is a high level overview meant to help you assess some areas you may need a refresher on. As always reach out to us if you need more help :)

## JavaScript
### For Loops
```js
var things = [...];
for (var i = 0; i < things.length; i++) {
    // Do something with things[i]
}
```

Be comfortable _iterating_ over an array and accessing elements (or items) in an array.

### IF / Else If / Else
```js
if (canLogin === true) {
    // handle login
} else if (canUpdate === true) {
    // handle can update stuff
} else {
    // handle the default case
}
```

_Note: It would help to be comfortable with the operators, too: *&&* and *||*_

### Functions
Know the difference between:
```js
function foo(myArgs) {
    // function details
}
```

and

```js
foo('Hello');
```

The first is a function _declaration_ and the second is a function _execution_ (also known as calling or invoking the function)

### Strings and Arrays
Before comfortable with working with `strings` and `arrays` as these are the most common data types you'll be encoutering
in your homeworks and in your professional lives as well.
```js
var str = 'I am a string';
var arr = ['I', 'am', 'an', 'array', 'of', 'strings'];

// Don't forget that arrays can have ALL TYPES of data inside
var numArray = [1, 2, 3, 4, 5];
var mixedArray = ['a', 1, {obj: 1}]; // <-- mixed array
```

Here are some good links to consider for learning more about these two APIs:
* String API - [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String) & [w3schools](http://www.w3schools.com/js/js_strings.asp)
* Array API - [Mozilla Developer Network](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) & [w3schools](http://www.w3schools.com/js/js_arrays.asp)

### Objects
In JavaScript objects are a collection of properties (think of a bunch of variables tied together by a parent variable)

```js
var person = {
    name: 'Johhny',
    age: 24
}

// So to access these properties, you'll do something like:
console.log(person.name);
console.log(person.age);
```
## JQuery
### Creating HTML Elements vs Element Selectors
```js
$('<div>'); //<-- Creates an DIV HTML node
$('<button>'); // <-- Creates a button

// The following are all selectors
$('div'); //<-- tries to find all divs
$('.myDiv'); //<-- finds all elements with class myDiv
$('#myDiv'); //<-- finds any elements with the ID of myDiv
```
Be comfortable creating any of the different types of elements using this technique. Check out the [jQuery API](http://api.jquery.com/) for more information.
### Adding elements to the DOM and changing Text
```js
// Given some HTML or a new ELEMENT
var childDiv = $('<div>');

$('#parentDiv').append(childDiv);

// Similarly we can use a prepend
$('#otherParentDiv').prepend(childDiv);
```
Have a look at the `.empty()` command as well for tips on erasing the contents of a HTML element.
