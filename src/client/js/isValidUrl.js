const validator = require('validator');

export function isValidUrl(url) {
  if (validator.isEmail(url)) {
    return false;
  }
  
  return validator.isURL(url, {
    protocols: ['http', 'https'],
    require_protocol: true,
    require_valid_protocol: true,
    require_tld: true,
  });
}

