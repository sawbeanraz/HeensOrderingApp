const bcrypt = require('bcryptjs');
const token = require('jsonwebtoken');

module.exports = (
  User,
  {
    validateLogin,
    validateRegistration,
  },
  secretKey,
) => {
  if (!secretKey) {
    throw Error('Missing secret key');
  }

  const login = (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
      res.status(400).json(errors);
      return {};
    }

    return User.findOne({ email }).then((user) => {
      if (!user) {
        errors.email = 'User not found.';
        res.status(404).json(errors);
        return;
      }

      const { _id: id, name } = user;
      const payload = {
        id,
        name,
      };

      bcrypt.compare(password, user.password).then((match) => {
        if (match) {
          token.sign(payload, secretKey, { expiresIn: 3600 }, (err, signedToken) => {
            res.json({
              success: true,
              token: `Bearer ${signedToken}`,
            });
          });
        } else {
          errors.password = 'Invalid password';
          res.status(400).json(errors);
        }
      });
    });
  };

  const registration = (req, res) => {
    const { errors, isValid } = validateRegistration(req.body);

    if (!isValid) {
      res.status(400).json(errors);
      return {};
    }

    return User.findOne({ email: req.body.email }).then((user) => {
      if (user) {
        res.status(422);
        res.json({ msg: 'Email already exists' });
        return;
      }

      const { name, email, password } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) throw err; // unlikely to occurs

        bcrypt.hash(password, salt, (hashError, hash) => {
          if (hashError) {
            res.status(500);
            res.json({ msg: 'Unexpected error hashing password' });
            return;
          }

          new User({
            name,
            email,
            password: hash,
          })
            .save()
            .then((newUserCreated) => {
              res.status(201);
              res.json(newUserCreated);
            })
            .catch((saveErr) => {
              res.status(500);
              res.json(saveErr);
            });
        });
      });
    });
  };

  return {
    login,
    registration,
  };
};
