const apiAdapter = require("../../apiAdapter");
const { URL_SERVICE_COURSE, HOSTNAME } = process.env;
const api = apiAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const courses = await api.get("/api/courses", {
      params: {
        ...req.query,
        status: "published",
      },
    });

    const coursesData = courses.data;
    coursesData.data.first_page_url = `${HOSTNAME}/courses?
        ${coursesData.data.first_page_url.split("?").pop()}`;
    coursesData.data.last_page_url = `${HOSTNAME}/courses?
        ${coursesData.data.last_page_url.split("?").pop()}`;

    if (coursesData.data.next_page_url) {
      coursesData.data.next_page_url = `${HOSTNAME}/courses?
        ${coursesData.data.next_page_url.split("?").pop()}`;
    }

    if (coursesData.data.prev_page_url) {
      coursesData.data.prev_page_url = `${HOSTNAME}/courses?
        ${coursesData.data.prev_page_url.split("?").pop()}`;
    }

    coursesData.data.path = `${HOSTNAME}/courses`;

    return res.json(coursesData);
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
