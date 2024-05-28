module.exports = function (req, res, next) {
  const env = process.env.NODE_ENV;
  if (env != "development") {
    const method = req.method.toLowerCase();
    if (!(req.user.permission_string.includes(permissionString[method]))) return res.status(403).send('Access denied.');
  }

  next();
}

const permissionString = {
  post: 'c',
  get: 'r',
  put: 'u',
  delete: 'd',
}