
exports.generateToken = (user) => {
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
    return token;
  };
  