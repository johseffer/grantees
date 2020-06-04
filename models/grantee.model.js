const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Grantee = new Schema({
    name: {
        type: String
    },
    cpfCnpj: {
        type: String
    },
    email: {
        type: String
    },
    bank: {
        type: String
    },
    agency: {
        type: String
    },
    agencyDigit: {
        type: String
    },
    account: {
        type: String
    },
    accountDigit: {
        type: String
    },
    accountType: {
        type: String
    },
    status: {
        type: String
    }
});
module.exports = mongoose.model('Grantee', Grantee);