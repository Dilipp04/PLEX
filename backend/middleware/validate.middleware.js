const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (error) {
    const msg = error.issues[0].message;
    //error middleware default error function calling
    next({ status: 400, errorDetails: "Validiation error" + msg });
  }
};

module.exports = validate;
