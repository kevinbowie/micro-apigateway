const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;

    const review = await api.delete(`/api/reviews/${id}`);
    return res.json(review.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.code === "ECONNABORTED") {
      return res
        .status(500)
        .json({ status: "error", message: "service unavailable" });
    } else if (error.code) {
      return res.json(error);
    }

    const { status, data } = error.response;
    return res.status(status).json(data);
  }
};