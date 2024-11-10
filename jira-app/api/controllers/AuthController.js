require("dotenv").config();

module.exports = {
  login: async function (req, res) {
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
