import { StatusCodes } from "http-status-codes";
import BadRequestError from "../errors/bad-request.js";
import UnAuthenticatedError from "../errors/unauthenticated.js";

const errorHandlerMiddleware = (err, req, res, next) => {
  //console.log(err, "err");
  if (err instanceof BadRequestError) {
    return res
      .status(err.statusCode)
      .json({ statuscode: err.statusCode, message: err.message });
  } else if (err instanceof UnAuthenticatedError) {
    return res
      .status(err.statusCode)
      .json({ statuscode: err.statusCode, message: err.message });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
};

export default errorHandlerMiddleware;
