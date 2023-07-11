# Checkpoint 3

In this third installment of the checkpoint series, we'll take a look at databases, express and handlebars.

## MYSQL
Mysql is an implementation of the SQL database. Let's have a look at some of the fundamentals.

### Create a database
A database consists of a collection of tables.
```sql
CREATE DATABASE students_db;
```

### Choose which database to use
When we `use` a database, it determines which set of tables to run queries against
run against 
```sql
USE students_db;
```

### Create a table
Remember that a table is a set of rows and columns. Each column needs to have a data type (`int`, `varchar`, `double`, `date`, etc.)
```sql
CREATE TABLE users (
    -- column called id that is an integer, cannot be null, will be incremented by 1 with every new row
    id int not null auto_increment,
    -- column called username that is a string, cannot be null and is max 255 characters
    username varchar(255) not null,
    -- column called password that is a string, cannot be null and is max 20 characters
    password varchar(20) not null,
    -- determines which column in the table is the unique identifier (i.e., the primary key)
    primary key(id)
);
```

### MYSQL CRUD
When we talk about CRUD, it shows up in multiple places (Web Servers, Databases). Let's look at it from the point of view of `databases` in the context of working directly with the database, not from `JavaScript`:
#### C is for Create
To *create* a new row in the database, we use `INSERT`
```sql
INSERT INTO users VALUES ("megapoor", "w3ar3TAs5");

-- we can be selective here and only insert columns by name (which allows us to exclude some columns)

INSERT INTO users (username, password) values ("megapoor", "w3arTAs5");
```
#### R is for Read
To *read* data from the database, we use `SELECT`
```sql
-- select ALL rows from the database
SELECT * FROM users;

-- select only the rows that match my condition. In this case, we only want the rows where the username matches "megapoor"
SELECT * FROM users WHERE username = "megapoor"

-- select only specific columns from the database
SELECT username FROM users;
```
_Note: There are lots of ways to construct a query for a database and you should be mindful of that. Find more information here: [SQL Tutorial from w3schools](https://www.w3schools.com/sql/)._
#### U is for Update
To *update* EXISTING rows in the database, we use
the update command.
```SQL
-- Update the username for EVERY ROW that satisfies our query condition (i.e, WHERE id = 1;)
UPDATE users set username = "megapooooor" WHERE id = 1;
```
🚨 _Updates can be dangerous if you leave off the WHERE clause! Always confirm that you have a WHERE clause before running an update or else you'll update the entire table._ 💀

PRO TIP 🔑: Write a select statement version of your update to confirm it affects the correct rows. For example:
```sql
UPDATE users set username = "megapooooor" WHERE id = 1;
```
would be first verified with a `select` statement such as:
```sql
SELECT users FROM WHERE id = 1;
```
This way we're clear as to which rows will be impacted by our select statement.

#### D is for Delete
To *delete* a row from the database, we use the delete command:

```sql
-- deletes all of the rows that match our condition
DELETE from users WHERE id = 1;
```
Again, be aware of the fact that using a DELETE command WITHOUT a WHERE CLAUSE could lead to major drama. Use the PRO TIP described in the UPDATE case here as well!

### WEB SERVER CRUD
When we talk about CRUD, it shows up in multiple places (Web Servers, Databases). Let's look at it from the point of view of `web servers`. In this case, we map the CRUD operations to HTTP Verbs.

#### C is for Create
Create maps to the POST HTTP verb. POST accepts data as a body. Here `body-parser` is very helpful. If the server receives a request to a post route called `/api/user/new` with the data:
```json
{
    "username": "megapoor",
    "role": "super TA"
}
```
Let's look at what the server side code looks like to process this request:
```js
app.post("/api/user/new", function (request, response) {
    // using body parser we can get the entire BODY 
    var data = request.body;

    // or we can reference individual properties from the object.
    var username = request.body.username;
    var role = request.body.role;

    // We can then save the data to our database using INSERT...
});
```
#### R is for Read
Read maps to the GET HTTP verb. GET can actually accept data in a couple ways: 
1. Query String parameters => `localhost:3000/all?users=jane`
2. Route parameters => `localhost:3000/users/megapoor` (these ARE NOT EXCLUSIVE to GET!)

Let's look at an example of GET request:

```js
app.get("/users/:username", function (request, response) {
    // let's get the username from the route
    var username = request.params.username;

    // now we can get this users data from the database using a SELECT
});
```
#### U is for Update
Update maps to the PUT HTTP verb (remember U in update, U in Put 🔑). We'll normally send data the same way we do for POST.

Consider the following example:
We make a PUT request to the route `localhost:3000/users/megapoor` with the data:
```json
{
    "email": "megapoor@ta.com"
}
```
Here's one implementation of the server side code for this request:
```js
//🚨 this route only responds to PUT requests to this specified route AND we are using route params, too!
app.put("/users/:username", function (request, response) {
    // get the parameter from the route
    var username = request.params.username;
    // now get the DATA from the body
    var email = request.body.email;

    // now we can write an UPDATE statement for the database such as `UPDATE users SET email = ${email} WHERE username = ${username}`
});
```
#### D is for Delete
Delete maps to the DELETE HTTP verb. Here, to DELETE in a RESTful way, you'll ideally want to provide a unique way to identify the thing you want to delete (something unique - like an ID 🚀).

Consider the following:
We make a DELETE request to the route
`localhost:3000/users/1` (where 1 represents that database ID)

Here's an example implementation of that use case:
```js
app.delete("/users/:id", function(request, response) {
    // get the parameter from the route
    var userid = request.params.id; // notice that I used a different VARIABLE name, but the request.params.id has to match :id from the route

    // DELETE FROM users where id = ${userid}
});
``` 

### Handlebars
Handlebars is a way for us to keep our code dry by giving us a way to make templates (ONCE!) that we can fill in with dynamic data.
#### Configuration
The configuration for handlebars is two parts:
1. File structure configuration
2. JavaScript configuration

##### File Structure
```
sample-project
| server.js
| package.json
| 
└──views (in these templates we use {{ property }})
|    |  index.handlebars
|    |  [any other specific templates]
|    |
|    └──layouts (the main layout with {{{ body }}})
|        main.handlebars

We've excluded other folders here because there are a few ways to set it up. Please refer to one of the class examples from week 14 for more information.
```
##### JavaScript
After we've configured the folder structure, your `server.js` (or whatever you call your main application JavaScript file) needs to have some configuration changes:

```js
var exphbs = require("handlebars");

// Define the "engine" to be "handlebars" and we configure the handlebars primary layout which will be "main.handlebars"
app.engine("handlebars", exphbs({defaultLayout: "main"}));
// Tell our express app to user that view engine to be "handlebars" (that we just defined above)
app.set("view engine", "handlebars");
```

### Templates
Templates take two primary forms:
1. The main layout - contains the `{{{ body }}}`
2. Page specific templates such as `index`, `posts`, `account` for example. We can `render` these templates in our app and _bind_ data to them.

#### Main Layout
The `views\layouts\main.handlebars` should be considered the primary template for your application. You'll include the HTML that will be shown on every page. So this is where you'll likely put your styles, jQuery and common scripts that'll be used on _EVERY_ page. Here's an example:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
    </head>
    <body>
        <!-- 
            🚨 This is the template tag that allows the other individual tags to be used.
            
            You can actually surround this tag with whatever you want! For example:
            
            <span>{{{ body }}}</span> 

            You have lots of options here.
        -->
        {{{ body }}}
    </body>
</html>
```
#### Other Templates
Once your primary layout has been configured, you can configure your apps to display what can be considered as individual page templates. Let's consider `index.handlebars`:

```handlebars
    <div> Welcome {{name}} </div>
```

In order for this to work, we need some some setup on our server side. Here's an example of a function that would make this template render correctly.

```js
app.get("/", function (request, response) {
    // The render method requires that we give it an 
    // object with some data. In this case, the key
    // "name" has the STRING value "Josephina"
    response.render("index", {
        "name": "Josephina"
    });
});
```
We can further expand our code here, to send more sophisticated objects back to the front end! Let's update our example:

`index.handlebars`
```handlebars
    <div> Hello {{ person.firstName }} {{ person.lastName }} </div>
```
`server.js`
```js
app.get("/", function (request, response) {
    // The render method here is rendering the "index.handlebars"
    // template. On that template we have the object "person" 
    // available to use! Now you can see that we can send all
    // sorts of data to the handlebars template and interact with them
    // in the template.
    //
    // be mindful of the idea that we're able to send STRINGS, OBJECTS, 
    // NUMBERS to the front end in our templates.
    response.render("index", {
        "person": {
            "firstName": "Jojo",
            "lastName": "Dentco"
        }
    });
});
```
#### Other Template Tools
With handlebars templates, we're able to use some familiar programming constructs. Check out this VERY helpful [guide to helpers](http://handlebarsjs.com/builtin_helpers.html).

##### If / Else
In JavaScript, we're able to use if/else to choose an execution path, we can do the same in Handlebars:

```handlebars
<div>
    {{#if person.tall}}
        <span>{{person.name}} is tall</span>
    {{#else}}
        <span>{{person.name}} is not tall</span>
    {{/if}}
</div>
```

For more cool examples, check out: [Built In Helpers](http://handlebarsjs.com/builtin_helpers.html)

### JavaScript on the Front-End + Templates?!
Our templates are `html` pages so we can use the same rules as we did as before. Consider this snippet of `index.html`:

```handlebars
<div>
    <button id="requestData">Request Data</button>
</div>
<div class="results"></div>
<script>
    $("#requestData").onClick(function () {
        $.ajax({
            method: 'GET',
            url: '/api/persons'
        })
    }).done(function (results) {
        // Here we can do our normal stuff like update
        // the results div above ✌
    });
</script>
```
### Testing Via Postman
Check out this [guide](https://docs.google.com/document/d/1mj-br1RKrqoOvUQGOysLkcmCW-pDpd2lSARUnVwdmVY/edit?usp=sharing).