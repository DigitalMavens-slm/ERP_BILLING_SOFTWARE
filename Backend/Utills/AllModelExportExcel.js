const  ExcelConverter=require("./ExportExcel")
const{Brand,} =require("../Model")
const ProductFormModel = require("../Model/ProductFormModel")
const BrandModel = require("../Model/BrandModel")
const CategoryModel = require("../Model/CategoryModel")




const ModelMap={
    Brand:BrandModel,
    Product:ProductFormModel,
    Category:CategoryModel
}



exports.AllModelExportExcel=async(req,res)=>{
    const {modelname}=req.params
    const Model=ModelMap[modelname]

    const filename=`${modelname}s.xlsx`
    await ExcelConverter(Model,res,modelname,filename)
    
}