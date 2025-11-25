const CompanySetting = require('../Model/CompanysettingModel');

// CREATE or SAVE
exports.createCompanySettings = async (req, res) => {
  try {
    const data = req.body;

    // Multer files
    if(req.files){
      if(req.files.logoUrl) data.logoUrl = req.files.logoUrl[0].path;
      if(req.files.paymentUrl) data.paymentUrl = req.files.paymentUrl[0].path;
      if(req.files.extraPaymentUrl) data.extraPaymentUrl = req.files.extraPaymentUrl[0].path;
    }
    const company = new CompanySetting(data);
    await company.save();
    res.json(company);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.saveCompanySettings = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if(req.files){
      if(req.files.logoUrl) data.logoUrl = req.files.logoUrl[0].path;
      if(req.files.paymentUrl) data.paymentUrl = req.files.paymentUrl[0].path;
      if(req.files.extraPaymentUrl) data.extraPaymentUrl = req.files.extraPaymentUrl[0].path;
    }

    const updated = await CompanySetting.findByIdAndUpdate(id, data, { new: true });
    res.json(updated);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// GET
exports.getCompanySettings = async (req, res) => {
  try {
    const settings = await CompanySetting.findOne();
    res.json(settings);
  } catch(err){
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

