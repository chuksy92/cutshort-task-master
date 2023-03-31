const Joi = require('joi');
const jwt = require('jsonwebtoken');



function validate(req) {
  const schema = Joi.object({
    email: Joi.string().required().email().min(5).max(50),
    password: Joi.string().required(),
  });

    return schema.validate(req);
}

 function validateContent(post) {
  const schema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(post);
}


 const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};

const generateToken = (user) => { 
  const token = jwt.sign(
		{ _id: user._id, email: user.email, name: user.name, role: user.role },
		process.env.TODO_PK
	);
  return token;
};


const verifyToken = (req, res, next) => {
  // console.log('here....')
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, process.env.TODO_PK);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).send('Invalid token.');
  }
}

// Access control
const restrictTo = (roles) => { 
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
			return res.status(403).json({
				status: 'fail',
				message: 'You do not have permission to perform this action',
			});
		}
    next();
  };
};

function validateComment(comment) {
	const schema = Joi.object({
		comment: Joi.string().required(),
	});
	return schema.validate(comment);
}

module.exports = {
	validate,
  validateContent,
  validateComment,
	catchAsync,
	verifyToken,
  generateToken,
  restrictTo
};


