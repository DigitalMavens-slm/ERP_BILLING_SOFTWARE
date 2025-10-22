// // routes/companySettingsRoutes.js
// const express = require('express');
// const { getCompanySettings, saveCompanySettings, createCompanySettings } = require('../Controller/CompanysettingController');

// const router = express.Router();

// router.get('/company-settings', getCompanySettings);

// router.post('/company-settings', createCompanySettings);
// router.put("/company-settings/:id",saveCompanySettings);




// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const controller = require('../Controller/CompanysettingController');

// Multer config
const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

router.get('/company-settings', controller.getCompanySettings);
router.post('/company-settings', upload.fields([
  { name: "logoUrl", maxCount: 1 },
  { name: "paymentUrl", maxCount: 1 },
  { name: "extraPaymentUrl", maxCount: 1 }]) ,controller.createCompanySettings);

router.put('/company-settings/:id', upload.fields([
  { name: "logoUrl", maxCount: 1 },
  { name: "paymentUrl", maxCount: 1 },
  { name: "extraPaymentUrl", maxCount: 1 }]), controller.saveCompanySettings);

module.exports = router;
