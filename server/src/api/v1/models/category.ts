import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  icon: String,
  slug: {
    type: String,
    unique: true,
  },
});

categorySchema.pre("save", async function (next) {
    if (this.isModified("name") || !this.slug) {
      let baseSlug = slugify(this.name, { lower: true, strict: true });
      let slug = baseSlug;
      let count = 1;

      // Tìm slug trùng
      while (await mongoose.models.Category.findOne({ slug })) {
        slug = `${baseSlug}-${count++}`;
      }

      this.slug = slug;
    }
    next();
  });
const Category = mongoose.model("Category", categorySchema, "categories");

export default Category;
