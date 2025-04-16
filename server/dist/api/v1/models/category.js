"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const slugify_1 = __importDefault(require("slugify"));
const categorySchema = new mongoose_1.default.Schema({
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
        let baseSlug = (0, slugify_1.default)(this.name, { lower: true, strict: true });
        let slug = baseSlug;
        let count = 1;
        // Tìm slug trùng
        while (await mongoose_1.default.models.Category.findOne({ slug })) {
            slug = `${baseSlug}-${count++}`;
        }
        this.slug = slug;
    }
    next();
});
const Category = mongoose_1.default.model("Category", categorySchema, "categories");
exports.default = Category;
