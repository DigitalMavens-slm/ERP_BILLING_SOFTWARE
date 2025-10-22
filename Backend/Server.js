const express=require("express")
const app=express()
const path=require("path")
const dotenv=require("dotenv")
const cors = require("cors")
const cookieParser=require("cookie-parser")
const ConnectDB=require("./Config/Database")
const LoginRoutes=require("./Routes/LoginRoutes")
const SalesRoutes=require("./Routes/SalesRoutes")
const PurchaseRoutes=require("./Routes/PurchaseRoutes")
const EmployeeRoutes=require("./Routes/EmployeeRoutes")
const InventoryRoutes=require("./Routes/InventoryRoutes")

const FinanceRoutes=require("./Routes/FinanceRoutes")
const ReportsRoutes=require("./Routes/ReportsRoutes")
const UsermanagementRoutes=require("./Routes/UsermanagementRoutes")

//       Setting Routes
const SupplierRoutes=require("./Routes/SupplierRouts")
const SubCategoryRoutes=require("./Routes/SubCategoryRoutes")
const BrandRoutes=require("./Routes/BrandRoutes")
const ProductFormRoutes=require('./Routes/ProductFormRoutes')
const CustomerRoutes=require("./Routes/CustomerRoutes")


const CompanySetting=require("./Routes/CompanysettingRoutes")
dotenv.config({path:path.join(__dirname,"config/config.env")})



app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/uploads', express.static('uploads'));

app.use("/api",LoginRoutes)
app.use("/api",SalesRoutes)
app.use("/api",PurchaseRoutes)
app.use("/api",EmployeeRoutes)
app.use("/api",InventoryRoutes)
app.use("/api",FinanceRoutes)
app.use("/",ReportsRoutes)
app.use("/",UsermanagementRoutes)

//   setting use
app.use("/api",CustomerRoutes)
app.use("/api",SupplierRoutes)
app.use("/api",SubCategoryRoutes)
app.use("/api",require("./Routes/CategoryRoutes"))
app.use("/api",BrandRoutes)
app.use("/api",ProductFormRoutes)
// app.use("/api",CompanySetting)
app.use('/api', CompanySetting);

app.use("/api",require("./Routes/BrandRoutes"))


app.listen(process.env.PORT,()=>{
    console.log(`http://localhost:${process.env.PORT}`);
    ConnectDB()
    
})