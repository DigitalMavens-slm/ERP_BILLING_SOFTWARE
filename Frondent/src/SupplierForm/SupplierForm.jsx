
import React, { useState } from "react";
import axios from "axios";
import { useAppLocation } from "../Context/LocationContext";
const API_URL=import.meta.env.VITE_API_URL
console.log(API_URL)

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/i;

const initialAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  pincode: "",
  country: "India",
};

export default function SupplierForm() {
  const {location,Goback} = useAppLocation();
console.log(location)
  const [supplier, setSupplier] = useState({
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

  const handleChange = (path) => (e) => {
    const value = e.target.value;

    if (path.includes(".")) {
      const [parent, key] = path.split(".");
      setSupplier((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [key]: value },
      }));

      if (copyBilling && parent === "billingAddress") {
        setSupplier((prev) => ({
          ...prev,
          shippingAddress: { ...prev.shippingAddress, [key]: value },
        }));
      }
    } else {
      setSupplier((prev) => ({ ...prev, [path]: value }));
    }
  };

  const toggleCopy = (e) => {
    const checked = e.target.checked;
    setCopyBilling(checked);
    if (checked) {
      setSupplier((prev) => ({
        ...prev,
        shippingAddress: { ...prev.billingAddress },
      }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!supplier.name.trim()) errs.name = "Supplier name is required";
    if (supplier.email && !/^\S+@\S+\.\S+$/.test(supplier.email))
      errs.email = "Invalid email";
    if (supplier.phone && !/^[0-9]{10,13}$/.test(supplier.phone))
      errs.phone = "Invalid phone (10-13 digits)";
    if (supplier.gstin && !gstRegex.test(supplier.gstin))
      errs.gstin = "Invalid GSTIN (format mismatch)";

    if (!supplier.billingAddress.line1.trim())
      errs.billingLine1 = "Billing address line1 required";
    if (!supplier.billingAddress.city.trim()) errs.billingCity = "City required";
    if (!supplier.billingAddress.state.trim()) errs.billingState = "State required";
    if (!/^[0-9]{6}$/.test(supplier.billingAddress.pincode))
      errs.billingPincode = "Pincode must be 6 digits";

    if (!copyBilling) {
      if (!supplier.shippingAddress.line1.trim())
        errs.shippingLine1 = "Shipping address line1 required";
      if (!supplier.shippingAddress.city.trim())
        errs.shippingCity = "Shipping city required";
      if (!supplier.shippingAddress.state.trim())
        errs.shippingState = "Shipping state required";
      if (!/^[0-9]{6}$/.test(supplier.shippingAddress.pincode))
        errs.shippingPincode = "Shipping pincode must be 6 digits";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
  e.preventDefault()
  console.log("button clicked")
    setMessage("");
    // if (!validate()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/suppliers`, supplier, {
        withCredentials: true,
      });
      setMessage("Supplier saved successfully");
      setSupplier({
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
        err?.response?.data?.message || "Server error — could not save supplier"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {location.pathname === "/setting/supplier" && (
        <form  onSubmit={handleSubmit} className="supplier-form-wrap">
          <button onClick={Goback}>back</button>
          <h2>Supplier Details</h2>
          <div className="supplier-form">
            {/* Supplier Name */}
            <div className="row">
              <label>Supplier Name *</label>
              <input
                value={supplier.name}
                onChange={handleChange("name")}
                placeholder="Supplier name"
              />
              {errors.name && <div className="error">{errors.name}</div>}
            </div>

            {/* Phone */}
            <div className="row">
              <label>Phone</label>
              <input
                value={supplier.phone}
                onChange={handleChange("phone")}
                placeholder="10-13 digits"
              />
              {errors.phone && <div className="error">{errors.phone}</div>}
            </div>

            {/* Email */}
            <div className="row">
              <label>Email</label>
              <input
                value={supplier.email}
                onChange={handleChange("email")}
                placeholder="example@mail.com"
              />
              {errors.email && <div className="error">{errors.email}</div>}
            </div>

            {/* GSTIN */}
            <div className="row">
              <label>GSTIN</label>
              <input
                value={supplier.gstin}
                onChange={(e) =>
                  setSupplier((p) => ({ ...p, gstin: e.target.value.toUpperCase() }))
                }
                placeholder="GSTIN (15 chars)"
                maxLength={15}
              />
              {errors.gstin && <div className="error">{errors.gstin}</div>}
              <small className="hint">
                Format: 2-digit state code + PAN + etc. (15 chars)
              </small>
            </div>

            {/* Billing Address */}
            <fieldset className="address-block">
              <legend>Billing Address</legend>
              <div className="row">
                <label>Address Line 1 *</label>
                <input
                  value={supplier.billingAddress.line1}
                  onChange={handleChange("billingAddress.line1")}
                  placeholder="Street / building"
                />
                {errors.billingLine1 && <div className="error">{errors.billingLine1}</div>}
              </div>
              <div className="row">
                <label>Address Line 2</label>
                <input
                  value={supplier.billingAddress.line2}
                  onChange={handleChange("billingAddress.line2")}
                  placeholder="Area / Landmark"
                />
              </div>
              <div className="row inline">
                <div style={{ flex: 1 }}>
                  <label>City *</label>
                  <input
                    value={supplier.billingAddress.city}
                    onChange={handleChange("billingAddress.city")}
                  />
                  {errors.billingCity && <div className="error">{errors.billingCity}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>State *</label>
                  <input
                    value={supplier.billingAddress.state}
                    onChange={handleChange("billingAddress.state")}
                  />
                  {errors.billingState && <div className="error">{errors.billingState}</div>}
                </div>
                <div style={{ flex: 1 }}>
                  <label>Pincode *</label>
                  <input
                    value={supplier.billingAddress.pincode}
                    onChange={handleChange("billingAddress.pincode")}
                    maxLength={6}
                  />
                  {errors.billingPincode && <div className="error">{errors.billingPincode}</div>}
                </div>
              </div>
            </fieldset>

            {/* Copy Billing Checkbox */}
            <div className="copy-row">
              <label>
                <input type="checkbox" checked={copyBilling} onChange={toggleCopy} /> Shipping
                same as billing
              </label>
            </div>

            {/* Shipping Address */}
            <fieldset className="address-block">
              <legend>Shipping Address</legend>
              <div className="row">
                <label>Address Line 1 *</label>
                <input
                  value={supplier.shippingAddress.line1}
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
                  value={supplier.shippingAddress.line2}
                  onChange={handleChange("shippingAddress.line2")}
                  disabled={copyBilling}
                />
              </div>
              <div className="row inline">
                <div style={{ flex: 1 }}>
                  <label>City *</label>
                  <input
                    value={supplier.shippingAddress.city}
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
                    value={supplier.shippingAddress.state}
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
                    value={supplier.shippingAddress.pincode}
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

            {/* Submit Button */}
            <div className="actions">
              <button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Supplier"}
              </button>
            </div>

            {/* Message */}
            {message && <div className="message">{message}</div>}
          </div>
        </form>
      )}
    </>
  );
}



