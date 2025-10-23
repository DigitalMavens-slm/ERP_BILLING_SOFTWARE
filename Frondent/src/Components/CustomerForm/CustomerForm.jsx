import React, { useState } from "react";
import axios from "axios";
import { useAppLocation} from "../../Context/LocationContext";
import {ExportExcel} from "../../Utills/ExportExcel"
import { ImportExcel } from "../../Utills/ImportExcel";

const API_URL=import.meta.env.VITE_API_URL


const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

const initialAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function CustomerForm() {
  const {location,Goback} = useAppLocation();
  console.log(location);

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
  const [message, setMessage] = useState("");
  const [file,setFile]=useState("")

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
          shippingAddress: {
            ...prev.shippingAddress,
            [key]: value,
          },
        }));
      }
    } else {
      setCustomer((prev) => ({ ...prev, [path]: value }));
    }
  };

  const toggleCopy = (e) => {
    const checked = e.target.checked;
    setCopyBilling(checked);
    if (checked) {
      setCustomer((prev) => ({
        ...prev,
        shippingAddress: { ...prev.billingAddress },
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!customer.name.trim()) errs.name = "Customer name is required";
    if (customer.email && !/^\S+@\S+\.\S+$/.test(customer.email))
      errs.email = "Invalid email";
    if (customer.phone && !/^[0-9]{10,13}$/.test(customer.phone))
      errs.phone = "Invalid phone (10-13 digits)";
    if (customer.gstin && !gstRegex.test(customer.gstin))
      errs.gstin = "Invalid GSTIN (format mismatch)";

    // Billing address validation
    if (!customer.billingAddress.line1.trim())
      errs.billingLine1 = "Billing address line1 required";
    if (!customer.billingAddress.city.trim()) errs.billingCity = "City required";
    if (!customer.billingAddress.state.trim())
      errs.billingState = "State required";
    if (!/^[0-9]{6}$/.test(customer.billingAddress.pincode))
      errs.billingPincode = "Pincode must be 6 digits";

    if (!copyBilling) {
      if (!customer.shippingAddress.line1.trim())
        errs.shippingLine1 = "Shipping address line1 required";
      if (!customer.shippingAddress.city.trim())
        errs.shippingCity = "Shipping city required";
      if (!customer.shippingAddress.state.trim())
        errs.shippingState = "Shipping state required";
      if (!/^[0-9]{6}$/.test(customer.shippingAddress.pincode))
        errs.shippingPincode = "Shipping pincode must be 6 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    console.log("button clicked")
    // if (!validate()) return;

    setLoading(true);
    try {
      console.log("post data added")
      const res = await axios.post(`http://localhost:4000/api/customers`,customer, { withCredentials: true });
      setMessage("Customer saved successfully");
      setCustomer({
        name: "",
        phone: "",
        email: "",
        gstin: "",
        billingAddress: { ...initialAddress },
        shippingAddress: { ...initialAddress },
      });
      setCopyBilling(false);
      setErrors({});
    } catch (err) {
      console.error(err);
      setMessage(
        err?.response?.data?.message || "Server error — could not save customer"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      {location.pathname === "/setting/customer" && (
        <div className="customer-form-wrap">
          <h2>Customer Details</h2>
          <button onClick={Goback}>Back</button>
          <form onSubmit={handleSubmit} className="customer-form">
            <div className="row">
              <label>Customer Name *</label>
              <input
                value={customer.name}
                onChange={handleChange("name")}
                placeholder="Customer name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            <div className="row">
              <label>Phone</label>
              <input
                value={customer.phone}
                onChange={handleChange("phone")}
                placeholder="10-13 digits"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            <div className="row">
              <label>Email</label>
              <input
                value={customer.email}
                onChange={handleChange("email")}
                placeholder="example@mail.com"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            <div className="row">
              <label>GSTIN</label>
              <input
                value={customer.gstin}
                onChange={(e) =>
                  setCustomer((p) => ({
                    ...p,
                    gstin: e.target.value.toUpperCase(),
                  }))
                }
                placeholder="GSTIN (15 chars)"
                maxLength={15}
              />
              {errors.gstin && <div className="error">{errors.gstin}</div>}
              <small className="hint">
                Format: 2-digit state code + PAN + etc. (15 chars)
              </small>
            </div>

            <fieldset className="address-block">
              <legend>Billing Address</legend>
              <div className="row">
                <label>Address Line 1 *</label>
                <input
                  value={customer.billingAddress.line1}
                  onChange={handleChange("billingAddress.line1")}
                  placeholder="Street / building"
                />
                {errors.billingLine1 && (
                  <div className="error">{errors.billingLine1}</div>
                )}
              </div>

              <div className="row">
                <label>Address Line 2</label>
                <input
                  value={customer.billingAddress.line2}
                  onChange={handleChange("billingAddress.line2")}
                  placeholder="Area / Landmark"
                />
              </div>

              <div className="row inline">
                <div style={{ flex: 1 }}>
                  <label>City *</label>
                  <input
                    value={customer.billingAddress.city}
                    onChange={handleChange("billingAddress.city")}
                  />
                  {errors.billingCity && (
                    <div className="error">{errors.billingCity}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label>State *</label>
                  <input
                    value={customer.billingAddress.state}
                    onChange={handleChange("billingAddress.state")}
                  />
                  {errors.billingState && (
                    <div className="error">{errors.billingState}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Pincode *</label>
                  <input
                    value={customer.billingAddress.pincode}
                    onChange={handleChange("billingAddress.pincode")}
                    maxLength={6}
                  />
                  {errors.billingPincode && (
                    <div className="error">{errors.billingPincode}</div>
                  )}
                </div>
              </div>
            </fieldset>

            <div className="copy-row">
              <label>
                <input
                  type="checkbox"
                  checked={copyBilling}
                  onChange={toggleCopy}
                />{" "}
                Shipping same as billing
              </label>
            </div>

            <fieldset className="address-block">
              <legend>Shipping Address</legend>

              <div className="row">
                <label>Address Line 1 *</label>
                <input
                  value={customer.shippingAddress.line1}
                  onChange={handleChange("shippingAddress.line1")}
                  placeholder="Street / building"
                  disabled={copyBilling}
                />
                {errors.shippingLine1 && (
                  <div className="error">{errors.shippingLine1}</div>
                )}
              </div>

              <div className="row">
                <label>Address Line 2</label>
                <input
                  value={customer.shippingAddress.line2}
                  onChange={handleChange("shippingAddress.line2")}
                  disabled={copyBilling}
                />
              </div>

              <div className="row inline">
                <div style={{ flex: 1 }}>
                  <label>City *</label>
                  <input
                    value={customer.shippingAddress.city}
                    onChange={handleChange("shippingAddress.city")}
                    disabled={copyBilling}
                  />
                  {errors.shippingCity && (
                    <div className="error">{errors.shippingCity}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label>State *</label>
                  <input
                    value={customer.shippingAddress.state}
                    onChange={handleChange("shippingAddress.state")}
                    disabled={copyBilling}
                  />
                  {errors.shippingState && (
                    <div className="error">{errors.shippingState}</div>
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Pincode *</label>
                  <input
                    value={customer.shippingAddress.pincode}
                    onChange={handleChange("shippingAddress.pincode")}
                    maxLength={6}
                    disabled={copyBilling}
                  />
                  {errors.shippingPincode && (
                    <div className="error">{errors.shippingPincode}</div>
                  )}
                </div>
              </div>
            </fieldset>

            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Customer"}
              </button>
            </div>
            {message && <div className="message">{message}</div>}
          </form>
        </div>
      )}


      <div style={{ marginTop: "20px" }}>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await ImportExcel("Brand", file);
            // fetchBrands(); 
          }}
        >
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            accept=".xlsx, .xls"
          />
          <button type="submit" disabled={!file}>
            Import Excel
          </button>
        </form>
      </div>

      <button onClick={()=>ExportExcel("Customer")}>Export</button>
    </>
  );
}
