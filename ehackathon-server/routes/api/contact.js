var express = require('express');
var router = express.Router();
var env = process.env.NODE_ENV || 'development';
var config = require('../../config/config.json')[env];

var mandrill = require('mandrill-api/mandrill');
var mandrillClient = new mandrill.Mandrill(config.mandrillApiKey);


router.post('/contact', function(req, res, next) {
  var message = {
    text: req.body.message,
    subject: 'WkndMVP Contact Form: ' + req.body.name,
    from_email: req.body.email,
    from_name: req.body.name,
    to: [{
            email: config.contactEmail,
            name: 'WkndMVP',
            type: 'to'
        }],
    headers: {
        'Reply-To': req.body.email
    }
  };

  mandrillClient.messages.send({message: message}, function(result) {
    if(result[0].status === 'sent') {
      res.send(200);
    } else {
      res.send(500);
    }
  })
});

module.exports = router;