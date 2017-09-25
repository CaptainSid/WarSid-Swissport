var mongoose = require('mongoose');
const planningAgentGlobalSchema = new mongoose.Schema({
  mois: {
    type: Number,
    required: true
  },
  annee: {
    type: Number,
    required: true
  },
  originalHeaders: [{
    type: String
  }],
  headers: [{
    type: String
  }],
  planning: [{
    type: mongoose.Schema.Types.Mixed
  }]
});

module.exports = mongoose.model('planningAgentGlobal', planningAgentGlobalSchema);