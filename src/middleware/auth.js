const JWT = require("jsonwebtoken");



const authentication = async function (req, res, next) {
  try {
    const token = req.rawHeaders[1].replace("Bearer ", "");

    // this lines not running at any time
    // if (!token) return res.status(400).send({ status: false, message: "required token" });

    JWT.verify(token, "this is secret don't tell this anyone !!", function (err, decoded) {
      if (err) {
        return res
          .status(401)
          .send({ status: false, message: err.message })
      };

      req.decoded = decoded;

      next();
    });

  } catch (err) {
    return res.status(500).send({ status: false, message: err.message });
  }
};




async function authorization(req, res, next) {
  try {
    authorId = req.params.authorId;

    if (authorId === ":authorId") return res
      .status(400)
      .send({ status: false, message: "authorId required" });

    // if (!ObjectId.isValid(authorId)) return res
    // .status(400)
    // .send({ status: false, message: "Please Enter Valid authorId" });

    if (req.decoded.authorId !== authorId) return res
      .status(403) //not authorized
      .send({ status: false, message: "not authorized" });

    next();

  } catch (err) {
    return res
      .status(500)
      .send({ status: false, message: err.message });
  }
}

module.exports = { authentication, authorization }