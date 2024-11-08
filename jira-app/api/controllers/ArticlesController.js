/**
 * ArticlesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  list: function (req, res) {
    Articles.find({}).exec(function (err, articles) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
      res.view("list", { articles: articles });
    });
  },

  add: function (req, res) {
    res.view("add");
  },

  create: function (req, res) {
    console.log("come to create articles");
    var title = req.body.title;
    var body = req.body.body;
    var summary = req.body.summary;
    var tags = req.body.tags;
    var status = req.body.status;
    Articles.create({
      title: title,
      body: body,
      summary: summary,
      tags: tags,
      status: status,
    }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
    });

    res.ok();
  },

  delete: function (req, res) {
    Articles.destroy({
      id: req.params.id,
    }).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
    });

    return false;
  },

  update: function (req, res) {
    var title = req.body.title;
    var body = req.body.body;
    var summary = req.body.summary;
    var tags = req.body.tags;
    var status = req.body.status;
    Articles.update(
      { id: req.params.id },
      { title: title, body: body, summary: summary, tags: tags, status: status }
    ).exec(function (err) {
      if (err) {
        res.send(500, { error: "Database Error" });
      }
    });
    return res.ok();
  },
};
