module.exports = async function (req, res, proceed) {
  try {
    console.log("come to is logged in policy");
    await sails.helpers.verifyToken.with({ token: req.headers.authorization });
    return proceed(); // Allow the request to continue
  } catch (error) {
    return res.forbidden(error.message); // Handle unauthorized access
  }
};
