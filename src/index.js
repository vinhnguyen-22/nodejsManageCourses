const path = require("path");
const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");

const SortMiddleware = require("./app/middlewares/SortMiddleware");

const route = require("./routes/index");
const db = require("./config/db");
//connect to db
db.connect();

const app = express();
const port = 3000;
//TODO ROUTE

app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

//Custom Middleware
app.use(SortMiddleware);

app.use(methodOverride("_method"));
//XMLHttpRequest,fetch,axios,
// http logger
app.use(morgan("combined"));

//Template engine
app.engine(
  ".hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: function (a, b) {
        return a + b;
      },
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";
        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };
        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}">
            <span class="${icon}"></span>
          </a>`;
      },
    },
  })
);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "resources", "views"));
//HOME, SEARCH, CONTACT tao mot file site de handle

route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
