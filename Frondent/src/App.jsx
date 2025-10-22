// 
import './App.css'
import LoginSignupPage from './Components/Loginsignup/LoginSignup'
import Sales from "./Components/Sales/Sales"
import Purchase from "./Components/Purchase/Purchase"
import Employee from "./Components/Employee/Employee"
import Inventory from "./Components/Inventory/Inventory"
import Reports from "./Components/Reports/Reports"
import Usermanagement from "./Components/Usermanagement/Usermanagement"
import Finance from "./Components/Finance/Finance"
import Mainpage from "./Pages/Mainpage"
import {SuggestionProvider} from "./Context/SuggestionContext"
import {Link, Route, Routes} from "react-router-dom"
import Settings from './Settings/Settings'
import SupplierForm from './SupplierForm/SupplierForm'
import { LocationProvider } from './Context/LocationContext'
// import CustomerForm from './Components/CustomerForm/CustomerForm'
import CustomerForm from "./Components/CustomerForm/CustomerForm"
import BrandForm from './BrandForm/BrandForm'
import CategoryForm from './Components/CategoryForm/CategoryForm'
import SubCategoryForm from './Components/SubCategory/SubCategory'
import ProductForm from './Components/ProductForm/ProductForm'
import CompanySettingsForm from './CompanySetting/CompanySetting'


function App() {

  return (
    // <SuggestionProvider>
    <SuggestionProvider>
      <LocationProvider>
    <>
   <div className="app-container">
    <div className='app-header'>
      <Mainpage/>
      </div>
       <div>
    <Routes>
      <Route path={"/"} element={<LoginSignupPage/>}/>
    <Route path={"/index"} element={<Purchase/>}/>
    <Route path={"/sales"} element={<Sales/>}/>
    <Route path={"/employee"} element={<Employee/>}/>
    <Route path={"/inventory"} element={<Inventory/>}/>
    <Route path={"/finance"} element={ <Finance/>}/>
    <Route path={"/reports"} element={<Reports/>}/>
    <Route path={"/management"} element={<Usermanagement/>}/>
    <Route path={"/setting"} element={<Settings/>}>
         <Route path={"supplier"} element={<SupplierForm/>}/>
          <Route path={"customer"} element={<CustomerForm/>}/>
          
         <Route path={"product"} element={<ProductForm/>}/>
         <Route path={"brand"} element={<BrandForm/>}/>
         <Route path={"category"} element={<CategoryForm/>}/>
         <Route path={"subcategory"} element={<SubCategoryForm/>}/>
    </Route>
    <Route path={"/Company"} element={<CompanySettingsForm/>}/>

     
    </Routes>
    </div>
    </div>
   
    </>
    </LocationProvider>
    </SuggestionProvider>
  )
}

export default App
