//const { default: slugify } = require("slugify");
//const { //default: slugify } = require("slugify");
const { default: slugify } = require("slugify");
const Category = require("../Models/Category");
const slug = require("slugify");
// function createCategory(category, parentId = null){
//     const categoryList = []
    
//     if(parentId == null){
//         Category = category.filter(cat => cat.parentId == undefined)
//     }else{
//         category = category.filter(cat => cat.parentId == parentId)
//     }
//     for(let cate of category){
//         categoryList.push({
//             _id: cate._id,
//             name: cate.name,
//             slug: cate.slug,
//             children: createCategory(category,cate._id)
//         })
//     }
//     return categoryList
// }

exports.addCategory = async(req,res)=> {
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name)
    }
    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }
    const _category = new Category({
        name, slug, parentId
      });
    const eCategory = await Category.findOne({ parentId})

    if (!eCategory) {
        _category.save().then(newCategory => {
          res.status(201).json(newCategory);
    
        })
         .catch(error => {
           res.status(400).json({ message: "Error occured", error })
         })
      } else {
        res
          .status(400).json({
            message: "Category Already Exist"
          })
      }
}

exports.findCategory = async (req, res) => {
    const category = await User.findById(req.id)
    return res.status(200).json({ category })
  }
  