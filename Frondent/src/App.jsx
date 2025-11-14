// 
import './App.css'
import LoginSignupPage from './Components/Loginsignup/LoginSignup'
import Sales from "./Components/Sales/Sales"
import Purchase from "./Components/Purchase/PurchaseApp"
import Employee from "./Components/Employee/Employee"
import Inventory from "./Components/Inventory/Inventory"
// import Reports from "./Components/Reports/Reports"
import Usermanagement from "./Components/Usermanagement/Usermanagement"
import Finance from "./Components/Finance/Finance"
import Mainpage from "./Pages/Mainpage"
import {SuggestionProvider} from "./Context/SuggestionContext"
import {Link, Route, Routes} from "react-router-dom"
import Settings from './Settings/Settings'
import SupplierForm from './SupplierForm/SupplierForm'
import { LocationProvider } from './Context/LocationContext'
import {KeySuggestionProvider} from "./Context/KeyBoardContext"
import CustomerForm from "./Components/CustomerForm/CustomerForm"
import BrandForm from './BrandForm/BrandForm'
import CategoryForm from './Components/CategoryForm/CategoryForm'
import SubCategoryForm from './Components/SubCategory/SubCategory'
import ProductForm from './Components/ProductForm/ProductForm'
import CompanySettingsForm from './CompanySetting/CompanySetting'
import InvoiceApp from './Invoice/InvoiceApp'
import InvoiceDetails from './Invoice/InvoiceDetail'
import PaymentUpdate from './Payment/PaymentUpdate'
import CustomerLedger from './Ledger'
import AllCustomerLedger from './Ledger/AllCustomerLedger'
import Report from './Reports/Reports'
// import "./input.css"


function App() {

  return (
    // <SuggestionProvider>
    // // <SuggestionProvider>
    //   <LocationProvider>
    //     <KeySuggestionProvider>
    <>
   <div className="app-container">
    <div className='app-header'>
      <div className="bg-red-600 text-yellow-300 p-6 text-3xl font-bold">
  TAILWIND TEST BOX 🔥
</div>

      <Mainpage/>
      </div>
       <div>
    <Routes>
      <Route path={"/"} element={<LoginSignupPage/>}/>
    <Route path={"/index"} element={<Purchase/>}/>
    {/* <Route path={"/sales"} element={<Sales/>}/> */}
    {/* <Route path={"/employee"} element={<Employee/>}/> */}
    <Route path={"/inventory"} element={<Inventory/>}/>
    {/* <Route path={"/finance"} element={ <Finance/>}/> */}
    {/* <Route path={"/reports"} element={<Reports/>}/> */}
    {/* <Route path={"/company"} element={<Use}/> */}
    <Route path={"/setting"} element={<Settings/>}>
         <Route path={"supplier"} element={<SupplierForm/>}/>
          <Route path={"customer"} element={<CustomerForm/>}/> 
         <Route path={"product"} element={<ProductForm/>}/>
         <Route path={"brand"} element={<BrandForm/>}/>
         <Route path={"category"} element={<CategoryForm/>}/>
         <Route path={"subcategory"} element={<SubCategoryForm/>}/>
    </Route>
    <Route path={"/company"} element={<CompanySettingsForm/>}/>
    <Route path={"/invoicecreate"} element={<InvoiceApp/>}>
    </Route>
         <Route path="/invoice-details" element={<InvoiceDetails/>} />
          <Route path='/payment-updation' element={<PaymentUpdate/>}/>
         <Route path="/ledger" element={<CustomerLedger/>}/>
         <Route path='/allcustomerledger' element={<AllCustomerLedger/>}/>
         <Route path="/reports" element={<Report/>}/>
    </Routes>
    </div>
    </div>
   
    </>
    // {/* </KeySuggestionProvider>
    // </LocationProvider>
    // </SuggestionProvider> */}
  )
}

export default App
