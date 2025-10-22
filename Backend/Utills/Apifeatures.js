// class Apifeatures{

//     constructor(query,queryStr){
//         this.query=query;                     // Mongoose query      //Product.find()
//         this.queryStr=queryStr; // req query   // The query string from the URL
//     }


//     search(){
//         let keyword=this.queryStr.keyword ?{
//             name:{
//                 $regex:this.queryStr.keyword,
//                 $options: 'i'
//             }
//         }:{};

//        this.query= this.query.find({...keyword})
//         return this;
//     }
    


//     // filter(){
        
//     //     const queryStrCopy ={...this.queryStr};
//     //     console.log(queryStrCopy);

//     //     const removeFields=['keyword','limit','page']
//     //     removeFields.forEach(field=> delete queryStrCopy[field]);

//     //     let queryStr=JSON.stringify(queryStrCopy);
//     //    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)/g,match=> `$${match}`) 
        
//     //     this.query.find(queryStrCopy);
//     //     return this;
        
//     // }


//     // paginate(resPerPage){
//     //     const currentPage=Number(this.queryStr.page) ||1;
//     //     const skip=resPerPage*(currentPage-1)
//     //     this.query.limit(resPerPage).skip(skip);
//     //     return this;
//     // }

// }

// module.exports=Apifeatures

class Apifeatures {
  constructor(query, queryStr) {
    this.query = query; // Mongoose Query object
    this.queryStr = queryStr; // Request query params
  }

  // 🔍 Search by keyword
  search() {
    const keyword = this.queryStr.keyword
      ? {
          $or: [
            { supplierName: { $regex: this.queryStr.keyword, $options: "i" } },
            { product: { $regex: this.queryStr.keyword, $options: "i" } },
          ],
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  // 🧮 Pagination (optional if you want)
  paginate(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);
    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

module.exports = Apifeatures;
