class NewsController {
  index(req, res) {
    //[GET]/ news
    res.render("news");
  }
  //[GET]/ news/slug
  show(req, res) {
    res.send("NEWS DETAIL");
  }
}
module.exports = new NewsController();
