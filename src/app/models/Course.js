const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongooseDelete = require("mongoose-delete");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const Schema = mongoose.Schema;

mongoose.plugin(slug);

const CourseSchema = new Schema(
  {
    _id: { type: Number },
    name_course: { type: String, minlength: 1, maxlength: 255, required: true },
    description: { type: String, maxlength: 600 },
    image: { type: String, maxlength: 255 },
    videoId: { type: String, maxlength: 255, required: true },
    level: { type: String },
    slug: { type: String, slug: "name_course", unique: true },
  },
  {
    _id: false,
    timestamps: true,
  }
);
//Custom query helpers
CourseSchema.query.sortable = function (req) {
  if (req.query.hasOwnProperty("_sort")) {
    const isValidtype = ["asc", "desc"].includes(req.query.type);
    return this.sort({
      [req.query.column]: isValidtype ? req.query.type : "desc",
    });
  }
  return this;
};

//add plugins
mongoose.plugin(slug);
CourseSchema.plugin(AutoIncrement);
CourseSchema.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: "all",
});

module.exports = mongoose.model("Course", CourseSchema);
