const { courseService: service, videoService } = require('../services');

const createResource = async (req, res, next) => {
  try {
    const data = await service.createResource(req.body);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const data = await service.getOne(id);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

const getMany = async (req, res, next) => {
  try {
    const { ids } = await req.query;
    let data;
    if(ids === undefined) {
      data = await service.getMany(req.query);
    } else {
      data = await service.getMany({_id: { $in: req.query.ids}});
    }
    return res.json(data);
  } catch (error) {
    // res.sendStatus(500);
    return next(error);
  }
};

const getVideos = async (req, res, next) => {
  try {
    const { ids } = await req.query;
    let data;
    if(ids === undefined) {
      return res.json({});
    } else {
      data = await videoService.getMany({'courseID': { $in: ids}});
    }

    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const { id } = await req.params;
    const data = await service.deleteResource(id);

    return res.json(data);
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createResource,
  getOne,
  getMany,
  getVideos,
  deleteResource
};
