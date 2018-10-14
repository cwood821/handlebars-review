var express = require("express");
var bodyParser = require("body-parser");

var app = express();

// Set the port of our application
var PORT = process.env.PORT || 55720;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));

app.set("view engine", "handlebars");

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "volcano_db"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + connection.threadId);
});

app.get("/", function(req, res) {
  connection.query("SELECT * FROM Volcanoes WHERE lastEruption != '';", function(err, data) {
    if (err) {
      console.log(err);
      return res.status(500).end();
    }
    res.render("index", { volcanoes: data });
  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
