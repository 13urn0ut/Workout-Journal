exports.checkId = (req, res, next) => {
  const { id } = req.params;

  if (!id || isNaN(id))
    return res.status(400).json({
      status: "fail",
      message: "Invalid ID",
    });

  next();
};
