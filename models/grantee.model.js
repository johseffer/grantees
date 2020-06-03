const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Grantee = new Schema({
    name: {
        type: String
    },
    cpfcnpj: {
        type: String
    },
    bank: {
        type: String
    },
    agency: {
        type: String
    },
    account: {
        type: String
    },
    status: {
        type: String
    }
});
module.exports = mongoose.model('Grantee', Grantee);