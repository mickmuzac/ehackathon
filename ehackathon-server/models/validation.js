var validate = require('mongoose-validator');
//see https://github.com/chriso/validator.js for options
exports.email = [
  validate({
    validator: 'isEmail',
    message: 'Invalid email address'
  })
];

exports.mongoId = [
  validate({
    validator: 'isMongoId',
    message: 'Invalid ID'
  })
];

exports.date = [
  validate({
    validator: 'isDate',
    message: 'Invalid date'
  })
]

exports.genericString = [
  validate({
    validator: 'isLength',
    arguments: [3, 1000],
    message: 'Should be between {ARGS[0]} and {ARGS[1]} characters.'
  })
]