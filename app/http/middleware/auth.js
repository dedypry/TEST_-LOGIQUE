const InvalidData = require('../../exceptions/InvalidData');
require('dotenv/config');


function auth() {
  return (req, res, next) => {
    const key = req.headers.key;
    if (!key ) {
      throw new InvalidData('API key is missing.', 403);
    }

    if (key != process.env.KEY) {
      throw new InvalidData('Invalid API key.', 401);
    }
    return next();
  };
}

module.exports= {
  auth,
};
