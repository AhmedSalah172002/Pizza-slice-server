const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/apiError');
const ApiFeatures = require('../utils/apiFeatures');


exports.getAll=(Model) =>
asyncHandler(async(req,res,next)=>{

  let filter = {};
    if (req.filterObj) {
      filter = req.filterObj;
    }

    const documentsCounts = await Model.countDocuments();
    const apiFeatures =new ApiFeatures(Model.find(filter), req.query)
    .paginate(documentsCounts)
      .filter()
      .search()
      .limitFields()
      .sort();

       // Execute query
    const { mongooseQuery, paginationResult } = apiFeatures;
    const documents = await mongooseQuery;

    res
      .status(200)
      .json({ results: documents.length, paginationResult, data: documents });
})

exports.createOne=(Model) =>
asyncHandler(async(req,res,next)=>{
    const data = await Model.create(req.body);
    res.status(201).json({ data: data });
})

exports.getOne=(Model) =>
asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const data = await Model.findById(id);
    if(!data){
      return next(new  ApiError(`No document for this id ${id}`,404))
    }
    res.status(200).json({ data: data });
})

exports.updateOne=(Model) =>
asyncHandler(async(req,res,next)=>{
    const { id } = req.params;
    const data = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
    if(!data){
      return next(new  ApiError(`No document for this id ${id}`,404))
    }

    res.status(200).json({ data: data });
})

exports.deleteOne = (Model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const data = await Model.findByIdAndDelete(id);

    if (!data) {
      return next(new ApiError(`No document for this id ${id}`, 404));
    }


    res.status(204).send();
  });