// import React, { useState } from "react";
// import axios from "axios";
// import { useAppLocation} from "../../Context/LocationContext";
// import {ExportExcel} from "../../Utills/ExportExcel"
// import { ImportExcel } from "../../Utills/ImportExcel";

// const API_URL=import.meta.env.VITE_API_URL


// const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

// const initialAddress = {
//   line1: "",
//   line2: "",
//   city: "",
//   state: "",
//   pincode: "",
//   country: "India",
// };

// export default function CustomerForm() {
//   const {location,Goback} = useAppLocation();
//   console.log(location);

//   const [customer, setCustomer] = useState({
//     name: "",
//     phone: "",
//     email: "",
//     gstin: "",
//     billingAddress: { ...initialAddress },
//     shippingAddress: { ...initialAddress },
//   });

//   const [copyBilling, setCopyBilling] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [file,setFile]=useState("")

//   const handleChange = (path) => (e) => {
//     const value = e.target.value;

//     if (path.includes(".")) {
//       const [parent, key] = path.split(".");
//       setCustomer((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [key]: value,
//         },
//       }));

//       if (copyBilling && parent === "billingAddress") {
//         setCustomer((prev) => ({
//           ...prev,
//           shippingAddress: {
//             ...prev.shippingAddress,
//             [key]: value,
//           },
//         }));
//       }
//     } else {
//       setCustomer((prev) => ({ ...prev, [path]: value }));
//     }
//   };

//   const toggleCopy = (e) => {
//     const checked = e.target.checked;
//     setCopyBilling(checked);
//     if (checked) {
//       setCustomer((prev) => ({
//         ...prev,
//         shippingAddress: { ...prev.billingAddress },
//       }));
//     }
//   };

//   const validate = () => {
//     const errs = {};
//     if (!customer.name.trim()) errs.name = "Customer name is required";
//     if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email))
//       errs.email = "Invalid email";
//     if (customer.phone && !/^[0-9]{10,13}$/.test(customer.phone))
//       errs.phone = "Invalid phone (10-13 digits)";
//     if (customer.gstin && !gstRegex.test(customer.gstin))
//       errs.gstin = "Invalid GSTIN (format mismatch)";

//     // Billing address validation
//     if (!customer.billingAddress.line1.trim())
//       errs.billingLine1 = "Billing address line1 required";
//     if (!customer.billingAddress.city.trim()) errs.billingCity = "City required";
//     if (!customer.billingAddress.state.trim())
//       errs.billingState = "State required";
//     if (!/^[0-9]{6}$/.test(customer.billingAddress.pincode))
//       errs.billingPincode = "Pincode must be 6 digits";

//     if (!copyBilling) {
//       if (!customer.shippingAddress.line1.trim())
//         errs.shippingLine1 = "Shipping address line1 required";
//       if (!customer.shippingAddress.city.trim())
//         errs.shippingCity = "Shipping city required";
//       if (!customer.shippingAddress.state.trim())
//         errs.shippingState = "Shipping state required";
//       if (!/^[0-9]{6}$/.test(customer.shippingAddress.pincode))
//         errs.shippingPincode = "Shipping pincode must be 6 digits";
//     }

//     setErrors(errs);
//     return Object.keys(errs).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     console.log("button clicked")
//     // if (!validate()) return;

//     setLoading(true);
//     try {
//       console.log("post data added")
//       const res = await axios.post(`http://localhost:4000/api/customers`,customer, { withCredentials: true });
//       setMessage("Customer saved successfully");
//       setCustomer({
//         name: "",
//         phone: "",
//         email: "",
//         gstin: "",
//         billingAddress: { ...initialAddress },
//         shippingAddress: { ...initialAddress },
//       });
//       setCopyBilling(false);
//       setErrors({});
//     } catch (err) {
//       console.error(err);
//       setMessage(
//         err?.response?.data?.message || "Server error — could not save customer"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };


//   return (
//     <>
//       {location.pathname === "/setting/customer" && (
//         <div className="customer-form-wrap">
//           <h2>Customer Details</h2>
//           <button onClick={Goback}>Back</button>
//           <form onSubmit={handleSubmit} className="customer-form">
//             <div className="row">
//               <label>Customer Name *</label>
//               <input
//                 value={customer.name}
//                 onChange={handleChange("name")}
//                 placeholder="Customer name"
//               />
//               {errors.name && <div className="error">{errors.name}</div>}
//             </div>

//             <div className="row">
//               <label>Phone</label>
//               <input
//                 value={customer.phone}
//                 onChange={handleChange("phone")}
//                 placeholder="10-13 digits"
//               />
//               {errors.phone && <div className="error">{errors.phone}</div>}
//             </div>

//             <div className="row">
//               <label>Email</label>
//               <input
//                 value={customer.email}
//                 onChange={handleChange("email")}
//                 placeholder="example@mail.com"
//               />
//               {errors.email && <div className="error">{errors.email}</div>}
//             </div>

//             <div className="row">
//               <label>GSTIN</label>
//               <input
//                 value={customer.gstin}
//                 onChange={(e) =>
//                   setCustomer((p) => ({
//                     ...p,
//                     gstin: e.target.value.toUpperCase(),
//                   }))
//                 }
//                 placeholder="GSTIN (15 chars)"
//                 maxLength={15}
//               />
//               {errors.gstin && <div className="error">{errors.gstin}</div>}
//               <small className="hint">
//                 Format: 2-digit state code + PAN + etc. (15 chars)
//               </small>
//             </div>

//             <fieldset className="address-block">
//               <legend>Billing Address</legend>
//               <div className="row">
//                 <label>Address Line 1 *</label>
//                 <input
//                   value={customer.billingAddress.line1}
//                   onChange={handleChange("billingAddress.line1")}
//                   placeholder="Street / building"
//                 />
//                 {errors.billingLine1 && (
//                   <div className="error">{errors.billingLine1}</div>
//                 )}
//               </div>

//               <div className="row">
//                 <label>Address Line 2</label>
//                 <input
//                   value={customer.billingAddress.line2}
//                   onChange={handleChange("billingAddress.line2")}
//                   placeholder="Area / Landmark"
//                 />
//               </div>

//               <div className="row inline">
//                 <div style={{ flex: 1 }}>
//                   <label>City *</label>
//                   <input
//                     value={customer.billingAddress.city}
//                     onChange={handleChange("billingAddress.city")}
//                   />
//                   {errors.billingCity && (
//                     <div className="error">{errors.billingCity}</div>
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>State *</label>
//                   <input
//                     value={customer.billingAddress.state}
//                     onChange={handleChange("billingAddress.state")}
//                   />
//                   {errors.billingState && (
//                     <div className="error">{errors.billingState}</div>
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>Pincode *</label>
//                   <input
//                     value={customer.billingAddress.pincode}
//                     onChange={handleChange("billingAddress.pincode")}
//                     maxLength={6}
//                   />
//                   {errors.billingPincode && (
//                     <div className="error">{errors.billingPincode}</div>
//                   )}
//                 </div>
//               </div>
//             </fieldset>

//             <div className="copy-row">
//               <label>
//                 <input
//                   type="checkbox"
//                   checked={copyBilling}
//                   onChange={toggleCopy}
//                 />{" "}
//                 Shipping same as billing
//               </label>
//             </div>

//             <fieldset className="address-block">
//               <legend>Shipping Address</legend>

//               <div className="row">
//                 <label>Address Line 1 *</label>
//                 <input
//                   value={customer.shippingAddress.line1}
//                   onChange={handleChange("shippingAddress.line1")}
//                   placeholder="Street / building"
//                   disabled={copyBilling}
//                 />
//                 {errors.shippingLine1 && (
//                   <div className="error">{errors.shippingLine1}</div>
//                 )}
//               </div>

//               <div className="row">
//                 <label>Address Line 2</label>
//                 <input
//                   value={customer.shippingAddress.line2}
//                   onChange={handleChange("shippingAddress.line2")}
//                   disabled={copyBilling}
//                 />
//               </div>

//               <div className="row inline">
//                 <div style={{ flex: 1 }}>
//                   <label>City *</label>
//                   <input
//                     value={customer.shippingAddress.city}
//                     onChange={handleChange("shippingAddress.city")}
//                     disabled={copyBilling}
//                   />
//                   {errors.shippingCity && (
//                     <div className="error">{errors.shippingCity}</div>
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>State *</label>
//                   <input
//                     value={customer.shippingAddress.state}
//                     onChange={handleChange("shippingAddress.state")}
//                     disabled={copyBilling}
//                   />
//                   {errors.shippingState && (
//                     <div className="error">{errors.shippingState}</div>
//                   )}
//                 </div>
//                 <div style={{ flex: 1 }}>
//                   <label>Pincode *</label>
//                   <input
//                     value={customer.shippingAddress.pincode}
//                     onChange={handleChange("shippingAddress.pincode")}
//                     maxLength={6}
//                     disabled={copyBilling}
//                   />
//                   {errors.shippingPincode && (
//                     <div className="error">{errors.shippingPincode}</div>
//                   )}
//                 </div>
//               </div>
//             </fieldset>

//             <div className="actions">
//               <button type="submit" disabled={loading}>
//                 {loading ? "Saving..." : "Save Customer"}
//               </button>
//             </div>
//             {message && <div className="message">{message}</div>}
//           </form>
//         </div>
//       )}


//       <div style={{ marginTop: "20px" }}>
//         <form
//           onSubmit={async (e) => {
//             e.preventDefault();
//             await ImportExcel("Brand", file);
//             // fetchBrands(); 
//           }}
//         >
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])}
//             accept=".xlsx, .xls"
//           />
//           <button type="submit" disabled={!file}>
//             Import Excel
//           </button>
//         </form>
//       </div>

//       <button onClick={()=>ExportExcel("Customer")}>Export</button>
//     </>
//   );
// }




import React, { useState } from "react";
import axios from "axios";
import { ArrowLeft, User, Phone, Mail, Landmark, MapPin, Home, Globe, Hash } from "lucide-react";
import { useAppLocation } from "../../Context/LocationContext";
import { ExportExcel } from "../../Utills/ExportExcel";
import { ImportExcel } from "../../Utills/ImportExcel";

const API_URL = import.meta.env.VITE_API_URL;

const initialAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function CustomerForm() {
  const { location, Goback } = useAppLocation();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    gstin: "",
    billingAddress: { ...initialAddress },
    shippingAddress: { ...initialAddress },
  });

  const [copyBilling, setCopyBilling] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");

  const handleChange = (path) => (e) => {
    const value = e.target.value;

    if (path.includes(".")) {
      const [parent, key] = path.split(".");
      setCustomer((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [key]: value,
        },
      }));

      if (copyBilling && parent === "billingAddress") {
        setCustomer((prev) => ({
          ...prev,
          shippingAddress: { ...prev.billingAddress, [key]: value },
        }));
      }
    } else {
      setCustomer((prev) => ({ ...prev, [path]: value }));
    }
  };

  const toggleCopy = (e) => {
    setCopyBilling(e.target.checked);
    if (e.target.checked) {
      setCustomer((prev) => ({
        ...prev,
        shippingAddress: { ...prev.billingAddress },
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(`${API_URL}/api/customers`, customer, { withCredentials: true });
      alert("Customer Saved Successfully!");
      setCustomer({
        name: "",
        phone: "",
        email: "",
        gstin: "",
        billingAddress: { ...initialAddress },
        shippingAddress: { ...initialAddress },
      });
      setCopyBilling(false);
    } catch (err) {
      alert("Error Saving Customer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {location.pathname === "/setting/customer" && (
        <div className="p-4 md:p-8 max-w-5xl mx-auto bg-white rounded-xl shadow">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Customer Details</h2>

            <button
              onClick={Goback}
              className="flex items-center gap-2 bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
            >
              <ArrowLeft size={18} /> Back
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* 🔹 BASIC INFO */}
            <div className="grid md:grid-cols-2 gap-5">

              {/* NAME */}
              <div>
                <label className="font-semibold">Customer Name *</label>
                <div className="input-box">
                  <User className="icon" />
                  <input
                    value={customer.name}
                    onChange={handleChange("name")}
                    placeholder="Full Name"
                  />
                </div>
              </div>

              {/* PHONE */}
              <div>
                <label className="font-semibold">Phone</label>
                <div className="input-box">
                  <Phone className="icon" />
                  <input
                    value={customer.phone}
                    onChange={handleChange("phone")}
                    placeholder="10–13 digits"
                  />
                </div>
              </div>

              {/* EMAIL */}
              <div>
                <label className="font-semibold">Email</label>
                <div className="input-box">
                  <Mail className="icon" />
                  <input
                    value={customer.email}
                    onChange={handleChange("email")}
                    placeholder="example@mail.com"
                  />
                </div>
              </div>

              {/* GST */}
              <div>
                <label className="font-semibold">GSTIN</label>
                <input
                  className="w-full p-2 border rounded"
                  value={customer.gstin}
                  onChange={(e) =>
                    setCustomer((prev) => ({
                      ...prev,
                      gstin: e.target.value.toUpperCase(),
                    }))
                  }
                  maxLength={15}
                  placeholder="GST 15 Characters"
                />
              </div>
            </div>

            {/* 🔹 BILLING + SHIPPING SIDE BY SIDE */}
            <div className="grid md:grid-cols-2 gap-6">

              {/* BILLING */}
              <fieldset className="p-4 rounded-lg border space-y-4">
                <legend className="font-bold">Billing Address</legend>

                <div className="input-box">
                  <Landmark className="icon" />
                  <input
                    placeholder="Address Line 1"
                    value={customer.billingAddress.line1}
                    onChange={handleChange("billingAddress.line1")}
                  />
                </div>

                <div className="input-box">
                  <Home className="icon" />
                  <input
                    placeholder="Address Line 2"
                    value={customer.billingAddress.line2}
                    onChange={handleChange("billingAddress.line2")}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="input-box">
                    <MapPin className="icon" />
                    <input
                      placeholder="City"
                      value={customer.billingAddress.city}
                      onChange={handleChange("billingAddress.city")}
                    />
                  </div>

                  <div className="input-box">
                    <Globe className="icon" />
                    <input
                      placeholder="State"
                      value={customer.billingAddress.state}
                      onChange={handleChange("billingAddress.state")}
                    />
                  </div>

                  <div className="input-box">
                    <Hash className="icon" />
                    <input
                      placeholder="Pincode"
                      value={customer.billingAddress.pincode}
                      maxLength={6}
                      onChange={handleChange("billingAddress.pincode")}
                    />
                  </div>
                </div>
              </fieldset>

              {/* SHIPPING */}
              <fieldset className="p-4 rounded-lg border space-y-4">
                <legend className="font-bold">Shipping Address</legend>

                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={copyBilling} onChange={toggleCopy} />
                  Same as Billing
                </label>

                <div className="input-box">
                  <Landmark className="icon" />
                  <input
                    placeholder="Address Line 1"
                    value={customer.shippingAddress.line1}
                    onChange={handleChange("shippingAddress.line1")}
                    disabled={copyBilling}
                  />
                </div>

                <div className="input-box">
                  <Home className="icon" />
                  <input
                    placeholder="Address Line 2"
                    value={customer.shippingAddress.line2}
                    onChange={handleChange("shippingAddress.line2")}
                    disabled={copyBilling}
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="input-box">
                    <MapPin className="icon" />
                    <input
                      placeholder="City"
                      value={customer.shippingAddress.city}
                      onChange={handleChange("shippingAddress.city")}
                      disabled={copyBilling}
                    />
                  </div>

                  <div className="input-box">
                    <Globe className="icon" />
                    <input
                      placeholder="State"
                      value={customer.shippingAddress.state}
                      onChange={handleChange("shippingAddress.state")}
                      disabled={copyBilling}
                    />
                  </div>

                  <div className="input-box">
                    <Hash className="icon" />
                    <input
                      placeholder="Pincode"
                      maxLength={6}
                      value={customer.shippingAddress.pincode}
                      onChange={handleChange("shippingAddress.pincode")}
                      disabled={copyBilling}
                    />
                  </div>
                </div>
              </fieldset>
            </div>

            {/* SUBMIT */}
            <button
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700"
              type="submit"
            >
              {loading ? "Saving..." : "Save Customer"}
            </button>

          </form>

        </div>
      )}

      {/* IMPORT EXPORT */}
      <div className="p-4">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await ImportExcel("Customer", file);
          }}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".xlsx,.xls"
            className="border p-2 rounded"
          />
          <button type="submit" disabled={!file} className="ml-2 bg-green-600 text-white px-4 py-2 rounded">
            Import Excel
          </button>
        </form>

        <button
          onClick={() => ExportExcel("Customer")}
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
        >
          Export Excel
        </button>
      </div>
    </>
  );
}
