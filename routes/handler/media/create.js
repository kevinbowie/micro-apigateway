const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_MEDIA } = process.env;
const api = apiAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.post("/media", req.body);
    return res.json(media.data);
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
