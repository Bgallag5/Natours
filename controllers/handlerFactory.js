//FACTORY FUNCTIONS - return new functions based on params passed in
// can reduce our handlers into one place in the application
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/APIFeatures');
const { populate } = require('../models/Review');
const { Model } = require('mongoose');

// create a document
exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.create(req.body);

    res.status(201).json({
      status: 'Success',
      data: {
        body: document
      },
    });
  });

// get one document
// options param allows us to differentially populate fields
exports.getOne = (Model, options) =>
  catchAsync(async (req, res, next) => {
     
    // if options: build query with populate options
    let query = Model.findById(req.params.id);
    if (options) query = query.populate(options);
    const document = await query;

    if (!document) {
      return next(new AppError(`Cannot find a ${Model} with this ID`));
    }
    res.status(200).json({
      status: 'Success',
      data: {
        data: document,
      },
    });
  });

//get all documents
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // if a tourId was passed in, search for reviews only on that tour
    // filter and tourId only apply for reviews
    let filter = {};
    if (req.params.tourId) filter = { tour: req.params.tourId };
    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const document = await features.query;

    res.status(200).json({
      status: 'success',
      results: document.length,
      data: {
        document,
      },
    });
  });

// update a document by it's ID
exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    if (req.body.password) req.body.password = undefined;
    console.log(req.body.password);

    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'Success',
      data: {
        data: document,
      },
    });
  });

// delete one document by it's ID
exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const document = await Model.findByIdAndDelete(req.params.id);

    if (!document) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(204).json({
      status: 'Success',
      data: null,
    });
  });
