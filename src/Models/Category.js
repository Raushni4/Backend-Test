const mongoose = require("mongoose")

const category = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
      },
    slug: {
        type: String,
        required: true,
        unique:true
      },
    parentId: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model
    ("Category", category);