
function checkGet (req, res, next) {
    
    if (!(req.user.permission_string.includes("r") || req.user.is_verified)) return res.status(403).send('Access denied.');
  
    next();
  }

  function checkPost (req, res, next) {
    
    if (!(req.user.permission_string.includes("c"))) return res.status(403).send('Access denied.');
  
    next();
  }

  function checkPut (req, res, next) {
    
    if (!(req.user.permission_string.includes("u"))) return res.status(403).send('Access denied.');
  
    next();
  }

  function checkDelete (req, res, next) {
    
    if (!(req.user.permission_string.includes("d"))) return res.status(403).send('Access denied.');
  
    next();
  }

  module.exports= {
      checkGet,
      checkPost,
      checkPut,
      checkDelete
  }