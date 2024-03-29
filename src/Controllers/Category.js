const Category = require("../Models/Category");
const { default: slugify } = require("slugify");
exports.addCategory = (req, res) => {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }
    const cat = new Category(categoryObj);
    cat.save((error, Category) => {
        if (error) return res.status(400).json({ error })
        if (Category) {
            return res.status(201).json({ Category })

        }
    })
}