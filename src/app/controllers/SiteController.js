const Course = require("../models/Course");
const { mutipleMongooseToObject } = require("../../ulti/mongoose");
class SiteController {
  index(req, res, next) {
    // [GET]/
    Course.find({})
      .then((courses) => {
        res.render("home", { courses: mutipleMongooseToObject(courses) });
      })
      .catch(next);
  }
  //[GET]/ /search
  search(req, res) {
    res.render("search");
  }
}
module.exports = new SiteController();
