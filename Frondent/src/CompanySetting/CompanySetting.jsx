

//  const currencyList = [
//   { code: "AED", symbol: "د.إ", name: "UAE Dirham" },
//   { code: "ARS", symbol: "$", name: "Argentine Peso" },
//   { code: "AUD", symbol: "A$", name: "Australian Dollar" },
//   { code: "BHD", symbol: "BD", name: "Bahraini Dinar" },
//   { code: "BDT", symbol: "৳", name: "Bangladeshi Taka" },
//   { code: "BRL", symbol: "R$", name: "Brazilian Real" },
//   { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
//   { code: "CLP", symbol: "$", name: "Chilean Peso" },
//   { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
//   { code: "COP", symbol: "$", name: "Colombian Peso" },
//   { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
//   { code: "DKK", symbol: "kr", name: "Danish Krone" },
//   { code: "EGP", symbol: "£", name: "Egyptian Pound" },
//   { code: "EUR", symbol: "€", name: "Euro" },
//   { code: "GBP", symbol: "£", name: "British Pound" },
//   { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
//   { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
//   { code: "HUF", symbol: "Ft", name: "Hungarian Forint" },
//   { code: "IDR", symbol: "Rp", name: "Indonesian Rupiah" },
//   { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
//   { code: "INR", symbol: "₹", name: "Indian Rupee" },
//   { code: "JPY", symbol: "¥", name: "Japanese Yen" },
//   { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
//   { code: "KRW", symbol: "₩", name: "South Korean Won" },
//   { code: "KWD", symbol: "KD", name: "Kuwaiti Dinar" },
//   { code: "LKR", symbol: "Rs", name: "Sri Lankan Rupee" },
//   { code: "MYR", symbol: "RM", name: "Malaysian Ringgit" },
//   { code: "MXN", symbol: "Mex$", name: "Mexican Peso" },
//   { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
//   { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
//   { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
//   { code: "OMR", symbol: "﷼", name: "Omani Rial" },
//   { code: "PEN", symbol: "S/", name: "Peruvian Sol" },
//   { code: "PKR", symbol: "₨", name: "Pakistani Rupee" },
//   { code: "PLN", symbol: "zł", name: "Polish Zloty" },
//   { code: "QAR", symbol: "﷼", name: "Qatari Riyal" },
//   { code: "RON", symbol: "lei", name: "Romanian Leu" },
//   { code: "RUB", symbol: "₽", name: "Russian Ruble" },
//   { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
//   { code: "SEK", symbol: "kr", name: "Swedish Krona" },
//   { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
//   { code: "THB", symbol: "฿", name: "Thai Baht" },
//   { code: "TRY", symbol: "₺", name: "Turkish Lira" },
//   { code: "TWD", symbol: "NT$", name: "Taiwan Dollar" },
//   { code: "UAH", symbol: "₴", name: "Ukrainian Hryvnia" },
//   { code: "USD", symbol: "$", name: "US Dollar" },
//   { code: "VND", symbol: "₫", name: "Vietnamese Dong" },
//   { code: "ZAR", symbol: "R", name: "South African Rand" }
// ];

//  const [logoFile, setLogoFile] = useState(null);
//   const [paymentFile, setPaymentFile] = useState(null);


//   useEffect(() => {
//     axios.get(`${API_URL}/api/company-settings`)
//       .then(res => {
//         if(res.data) setFormData(res.data);
//       })
//       .catch(err => console.log(err));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if(name.includes('address.')) {
//       const key = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         address: { ...prev.address, [key]: value }
//       }));
//     } else if(name.includes('bankDetails.')) {
//       const key = name.split('.')[1];
//       setFormData(prev => ({
//         ...prev,
//         bankDetails: { ...prev.bankDetails, [key]: value }
//       }));
//     } else if(type === 'checkbox') {
//       setFormData(prev => ({ ...prev, [name]: checked }));
//     } else {
//       setFormData(prev => ({ ...prev, [name]: value }));
//     }
//   };


//     const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "logoUrl") setLogoFile(files[0]);
//     if (name === "paymentUrl") setPaymentFile(files[0]);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if(formData._id){
//         axios.put(`${API_URL}/api/company-settings/${formData._id}`,formData)
//         .then(res=>alert("Company setting Updated"))
//     }
//     else{
//     axios.post(`${API_URL}/api/company-settings`, formData)
//       .then(res => alert('Company settings saved!'))
//       .catch(err => console.log(err));
//     }
    
    
//   };

//   return (
//     <div className="container">
//       <h2 className="title">Company Settings</h2>
//       <form onSubmit={handleSubmit} className="form">
//         <div className="form-group">
//           <label>Company Name *</label>
//           <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Contact Person *</label>
//           <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Mobile 1 *</label>
//           <input type="text" name="mobile1" value={formData.mobile1} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Mobile 2</label>
//           <input type="text" name="mobile2" value={formData.mobile2} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Email *</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>

//         <div className="form-group">
//           <label>Website</label>
//           <input type="text" name="website" value={formData.website} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Industry</label>
//           <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
//         </div>

//          <div className="form-group">
//           <label>Currency</label>
//          <select value={formData.currency} onChange={handleChange} name="currency">
//           <option value="">Select Currency</option>
//              {currencyList.map((currency,i)=>{
//                return <option key={i} value={currency.code}> {currency.code}</option>
//              })}
//          </select>
//        </div> 

//         <div className="form-group">
//           <label>Financial Month</label>
//             <select name="financialYearStart"
//     value={formData.financialYearStart}
//     onChange={handleChange} >
//                  <option value="">Select Year</option>

//   <option value="2024-2025">2024-2025</option>
//   <option value="2025-2026">2025-2026</option>
//   <option value="2026-2027">2026-2027</option>
//   { !["2024-2025","2025-2026","2026-2027"].includes(formData.financialYearStart) && 
//     <option value={formData.financialYearStart}>{formData.financialYearStart}</option>
//   }
//             </select>
//         </div>

//         <div className="form-group">
//           <label>Financial Year </label>
//           <select
//           value={formData.financialYearEnd}
//           name='financialYearEnd'
//     onChange={handleChange}>

//             <option value="">select</option>
//             <option value="JAN-DEC">JAN-DEC</option>
//             <option value="MAR-FEB">MAR-FEB</option>
//             <option value="FEB-JAN">FEB-JAN</option>
//             <option value="MAY-APR">MAY-APR </option>
//             <option value="APR-MAR">APR-MAR </option>
//             <option value="JUL-JUN">JUL-JUN </option>
//             <option value="JUN-MAY">JUN-MAY </option>
//             <option value="SEP-AUG">SEP-AUG </option>
//             <option value="AUG-JUL">AUG-JUL </option>
//             <option value="OCT-SEP">OCT-SEP </option>
//             <option value="NOV-OCT">NOV-OCT</option>
//             <option value="DEC-NOV">DEC-NOV</option>

//             <option value={formData.financialYearEnd}>{formData.financialYearEnd}</option>
//           </select>

//         </div>

        

//         <div className="form-group">
//           <label>GST Type</label>
//           <input type="text" name="gstType" value={formData.gstType} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>Composition Scheme</label>
//           <input type="checkbox" name="compositionScheme" checked={formData.compositionScheme} onChange={handleChange} />
//         </div>

//         <div className="form-group">
//           <label>GST No</label>
//           <select name='gstNo' onChange={handleChange}>
//             <option value="UNREGISTERED">UNREGISTERED</option>
//             <option value="REGISTERED">REGISTERED</option>
//              <option value={formData.gstNo}>{formData.gstNo}</option>
//           </select>
//         </div>

//         <div className="form-group">
//           <label>PAN No</label>
//           <input type="text" name="panNo" value={formData.panNo} 
//            disabled={formData.gstNo!=="REGISTERED"}
//            onChange={handleChange}/>
//         </div>

//         <h3>Address</h3>
//         <div className="form-group">
//           <label>Street</label>
//           <input type="text" name="address.street" value={formData.address?.street || ""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>City</label>
//           <input type="text" name="address.city" value={formData.address?.city||""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>State</label>
//           <input type="text" name="address.state" value={formData.address?.state ||""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Pincode</label>
//           <input type="text" name="address.pincode" value={formData.address?.pincode ||""} onChange={handleChange} />
//         </div>

//         <h3>Bank Details</h3>
//         <div className="form-group">
//           <label>Account Number</label>
//           <input type="text" name="bankDetails.accountNumber" value={formData.bankDetails?.accountNumber || ""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>IFSC</label>
//           <input type="text" name="bankDetails.ifsc" value={formData.bankDetails?.ifsc || ""} onChange={handleChange} />
//         </div>
//         <div className="form-group">
//           <label>Bank Name</label>
//           <input type="text" name="bankDetails.bankName" value={formData.bankDetails?.bankName || ""} onChange={handleChange} />
//         </div>

//       <div className="form-group">
//           <label>company Logo url</label>
//           <img src='' />
//           <input type="file" name="logoUrl" />
//         </div>

//       <div className="form-group">
//           <label>UPI LOCO</label>
//           <img src='' />
//           <input type="file" name="paymentUrl"/>
//         </div>

//         <div className="form-group">
//           <button type="submit">Save Settings</button>
//         </div>
//       </form>
//     </div>
//   );
// }



import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./CompanySetting.css"

const API_URL = import.meta.env.VITE_API_URL;

export default function CompanySettingsForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    mobile1: '',
    mobile2: '',
    email: '',
    website: '',
    industry: '',
    currentFinancialYear: '',
    financialYearStart: '',
    financialYearEnd: '',
    currency: '',
    gstType: '',
    compositionScheme: false,
    gstNo: '',
    panNo: '',
    address: { street: '', city: '', state: '', pincode: '' },
    bankDetails: { accountNumber: '', ifsc: '', bankName: '' },
    logoUrl: '',
  paymentUrl: '',
  extraPaymentUrl: '',
  });

  const [logoFile, setLogoFile] = useState(null);
  const [paymentFile, setPaymentFile] = useState(null);
  const [extraPaymentFile, setExtraPaymentFile] = useState(null);

  const currencyList = [
    { code: "AED" }, { code: "ARS" }, { code: "AUD" }, { code: "BHD" }, { code: "BDT" },
    { code: "BRL" }, { code: "CAD" }, { code: "CLP" }, { code: "CNY" }, { code: "COP" },
    { code: "CZK" }, { code: "DKK" }, { code: "EGP" }, { code: "EUR" }, { code: "GBP" },
    { code: "GHS" }, { code: "HKD" }, { code: "HUF" }, { code: "IDR" }, { code: "ILS" },
    { code: "INR" }, { code: "JPY" }, { code: "KES" }, { code: "KRW" }, { code: "KWD" },
    { code: "LKR" }, { code: "MYR" }, { code: "MXN" }, { code: "NGN" }, { code: "NOK" },
    { code: "NZD" }, { code: "OMR" }, { code: "PEN" }, { code: "PKR" }, { code: "PLN" },
    { code: "QAR" }, { code: "RON" }, { code: "RUB" }, { code: "SAR" }, { code: "SEK" },
    { code: "SGD" }, { code: "THB" }, { code: "TRY" }, { code: "TWD" }, { code: "UAH" },
    { code: "USD" }, { code: "VND" }, { code: "ZAR" }
  ];

  useEffect(() => {
    axios.get(`${API_URL}/api/company-settings`)
      .then(res => {
        if(res.data) setFormData(res.data);
      })
      .catch(err => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if(name.includes('address.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        address: { ...prev.address, [key]: value }
      }));
    } else if(name.includes('bankDetails.')) {
      const key = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        bankDetails: { ...prev.bankDetails, [key]: value }
      }));
    } else if(type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if(name === 'logoUrl') setLogoFile(files[0]);
    if(name === 'paymentUrl') setPaymentFile(files[0]);
    if(name === 'extraPaymentUrl') setExtraPaymentFile(files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    // Append normal fields
    Object.keys(formData).forEach(key => {
      if(typeof formData[key] === 'object' && formData[key] !== null){
        Object.keys(formData[key]).forEach(subKey => {
          data.append(`${key}.${subKey}`, formData[key][subKey]);
        });
      } else {
        data.append(key, formData[key]);
      }
    });

    // Append files
    if(logoFile) data.append('logoUrl', logoFile);
    if(paymentFile) data.append('paymentUrl', paymentFile);
    if(extraPaymentFile) data.append('extraPaymentUrl', extraPaymentFile);

    try {
      if(formData._id){
        await axios.put(`${API_URL}/api/company-settings/${formData._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Company settings updated!');
      } else {
        await axios.post(`${API_URL}/api/company-settings`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert('Company settings saved!');
      }
    } catch(err) {
      console.error(err);
      alert('Error saving settings');
    }
  };

  return (
    <div className="container">
      <h2>Company Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Company Name</label>
          <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} />
        </div>
        <div>
          <label>Contact Person</label>
          <input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile 1</label>
          <input type="text" name="mobile1" value={formData.mobile1} onChange={handleChange} />
        </div>
        <div>
          <label>Mobile 2</label>
          <input type="text" name="mobile2" value={formData.mobile2} onChange={handleChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div>
          <label>Website</label>
          <input type="text" name="website" value={formData.website} onChange={handleChange} />
        </div>
        <div>
          <label>Industry</label>
          <input type="text" name="industry" value={formData.industry} onChange={handleChange} />
        </div>

      <h3>Address</h3>
         <div className="form-group">
           <label>Street</label>
           <input type="text" name="address.street" value={formData.address?.street || ""} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label>City</label>
           <input type="text" name="address.city" value={formData.address?.city||""} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label>State</label>
           <input type="text" name="address.state" value={formData.address?.state ||""} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label>Pincode</label>
           <input type="text" name="address.pincode" value={formData.address?.pincode ||""} onChange={handleChange} />
         </div>

         <h3>Bank Details</h3>
         <div className="form-group">
           <label>Account Number</label>
           <input type="text" name="bankDetails.accountNumber" value={formData.bankDetails?.accountNumber || ""} onChange={handleChange} />/         </div>/         <div className="form-group">
           <label>IFSC</label>
           <input type="text" name="bankDetails.ifsc" value={formData.bankDetails?.ifsc || ""} onChange={handleChange} />
         </div>
         <div className="form-group">
           <label>Bank Name</label>
           <input type="text" name="bankDetails.bankName" value={formData.bankDetails?.bankName || ""} onChange={handleChange} />
         </div>

        <div>
          <label>Currency</label>
          <select name="currency" value={formData.currency} onChange={handleChange}>
            <option value="">Select</option>
            {currencyList.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
          </select>
        </div>

         <div className="form-group">
          <label>Financial Month</label>
            <select name="financialYearStart"
    value={formData.financialYearStart}
    onChange={handleChange} >
                 <option value="">Select Year</option>

  <option value="2024-2025">2024-2025</option>
  <option value="2025-2026">2025-2026</option>
  <option value="2026-2027">2026-2027</option>
  { !["2024-2025","2025-2026","2026-2027"].includes(formData.financialYearStart) && 
    <option value={formData.financialYearStart}>{formData.financialYearStart}</option>
  }
            </select>
        </div>



 <div className="form-group">
           <label>Financial Year </label>
           <select
          value={formData.financialYearEnd}
          name='financialYearEnd'
    onChange={handleChange}>

            <option value="">select</option>
            <option value="JAN-DEC">JAN-DEC</option>
            <option value="MAR-FEB">MAR-FEB</option>
            <option value="FEB-JAN">FEB-JAN</option>
            <option value="MAY-APR">MAY-APR </option>
            <option value="APR-MAR">APR-MAR </option>
            <option value="JUL-JUN">JUL-JUN </option>
            <option value="JUN-MAY">JUN-MAY </option>
            <option value="SEP-AUG">SEP-AUG </option>
            <option value="AUG-JUL">AUG-JUL </option>
            <option value="OCT-SEP">OCT-SEP </option>
            <option value="NOV-OCT">NOV-OCT</option>
            <option value="DEC-NOV">DEC-NOV</option>

            <option value={formData.financialYearEnd}>{formData.financialYearEnd}</option>
          </select>

        </div>


        
         <div className="form-group">
           <label>GST Type</label>
           <input type="text" name="gstType" value={formData.gstType} onChange={handleChange} />
         </div>

         <div className="form-group">
          <label>Composition Scheme</label>
           <input type="checkbox" name="compositionScheme" checked={formData.compositionScheme} onChange={handleChange} />
         </div>

        <div className="form-group">
          <label>GST No</label>
           <select name='gstNo' onChange={handleChange}>
             <option value="UNREGISTERED">UNREGISTERED</option>
             <option value="REGISTERED">REGISTERED</option>
             <option value={formData.gstNo}>{formData.gstNo}</option>
          </select>
         </div>

         <div className="form-group">
           <label>PAN No</label>
           <input type="text" name="panNo" value={formData.panNo} 
           disabled={formData.gstNo!=="REGISTERED"}
           onChange={handleChange}/>
        </div>
        {/* Files */}
                <img 
  src={`${API_URL}/${formData.logoUrl.replace(/\\/g, '/')}`} 
  alt="Company Logo" />
        <div>
          <label>Company Logo</label>
          <input type="file" name="logoUrl" onChange={handleFileChange} />
        </div>

        <div>
          <label>UPI Loco</label>
          <input type="file" name="paymentUrl" onChange={handleFileChange} />
        </div>

        <img 
  src={`${API_URL}/${formData.paymentUrl.replace(/\\/g, '/')}`} 
  alt="Payment QR" />
  
        <div>
          <label>Extra UPI Loco</label>
          <input type="file" name="extraPaymentUrl" onChange={handleFileChange} />
        </div>

        <button type="submit">Save Settings</button>
      </form>
    </div>
  );
}



