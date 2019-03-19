const mongoose = require('mongoose');

const tenantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
});

const Tenant = mongoose.model('Tenant', tenantSchema);


export default Tenant;
