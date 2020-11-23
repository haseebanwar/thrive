const axiosForSpoonacular = require('../utils/axios-for-spoonacular');

// @desc Proxy Endpoint for spoonacular
// @route GET /api/spoonacular
// @access PUBLIC
exports.get = async (req, res) => {
  try {
    const reqURL = req.originalUrl.replace('/api/spoonacular', '');

    // make request to original url
    const { data } = await axiosForSpoonacular.get(reqURL);

    return res.status(200).json({
      status: 'success',
      message: 'Request to spoonacular is successful',
      spoonacularResponse: data,
    });
  } catch (error) {
    console.log('error', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
};
