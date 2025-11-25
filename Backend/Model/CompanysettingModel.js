// const mongoose = require('mongoose');

// const companySettingsSchema = new mongoose.Schema({
//   companyName: { type: String, required: true },
//   contactPerson: { type: String, required: true },
//   mobile1: { type: String, required: true },
//   mobile2: { type: String },
//   email: { type: String, required: true },
//   website: { type: String },
//   industry: { type: String },
//   currentFinancialYear: { type: String },
//   financialYearStart: { type: String },
//   financialYearEnd: { type: String },
//   currency: { type: String },
//   gstType: { type: String },
//   compositionScheme: { type: Boolean, default: false },
//   gstNo: { type: String },
//   panNo: { type: String },
//   address: {
//     street: String,
//     city: String,
//     state: String,
//     pincode: String
//   },
//   logoUrl: { type: String },
//   paymentUrl:{type:String},
//   bankDetails: {
//     accountNumber: String,
//     ifsc: String,
//     bankName: String
//   }
// });

// module.exports = mongoose.model('CompanySettings', companySettingsSchema);

const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  companyName: String,
  contactPerson: String,
  mobile1: String,
  mobile2: String,
  email: String,
  website: String,
  industry: String,
  currentFinancialYear: String,
  financialYearStart: String,
  financialYearEnd: String,
  currency: String,
  gstType: String,
  compositionScheme: Boolean,
  gstNo: String,
  panNo: String,
  address: {
    street: String,
    city: String,
    state: String,
    pincode: String
  },
  bankDetails: {
    accountNumber: String,
    ifsc: String,
    bankName: String
  },
  logoUrl: String,
  paymentUrl: String,
  extraPaymentUrl: String
}, { timestamps: true });

module.exports = mongoose.model('CompanySetting', companySchema);

