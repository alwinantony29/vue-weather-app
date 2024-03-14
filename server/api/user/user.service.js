const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("./user.model");

module.exports = {

  verifyToken: (req, res, next) => {
    const token = req.headers['authorization']
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
    jwt.verify(token.split(' ')[1], process.env.JWT_KEY, (err, decoded) => {
      if (err) {
        console.log("token verification error: ", token);
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.user = decoded;
      console.log("verified token", req.user);
      next();
    })
  },
  async handleSignup(req, res) {
    try {
      const { userName, email, password } = req.body;
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email is already in use" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new userModel({
        userName,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
  async handleSignIn(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, {
        expiresIn: "1d",
      });
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server Error" });
    }
  },
};
