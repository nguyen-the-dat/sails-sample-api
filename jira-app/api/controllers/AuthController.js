require("dotenv").config();

module.exports = {
  login: async function (req, res) {
    // return  AuthService.loginService(req.body.email, req.body.password);
    console.log("come to login controller");
    try {
      const accessToken = await AuthService.loginService(
        req.body.email,
        req.body.password
      );
      return res.ok({ token: accessToken });
    } catch (error) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  },
};
