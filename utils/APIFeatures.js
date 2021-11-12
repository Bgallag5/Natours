class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    //make copy of req.query via destructure req.query
    const queryObject = { ...this.queryString };
    //we don't want these fields in our queries
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    //remove unwanted fields from our copy of queryObject
    excludedFields.forEach((el) => delete queryObject[el]);
    //regex to replace query params with Mongo query params (Mongo prefixes with a '$')
    let queryStr = JSON.stringify(queryObject);
    queryStr = queryStr.replace(/\b(gte|gt|lt|lte)\b/g, (match) => `$${match}`);

    //find Tours that match query string
    this.query = this.query.find(JSON.parse(queryStr));

    //return entire object - allows for chiaining class methods -because the object with those methods is returned-
    return this;
  }

  sort() {
    //if sort params => split each query param then sort by each param
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      //else sort by createdAt descending
      this.query = this.query.sort('-createdAt');
    }
    //return entire object
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100;
    const skip = page * limit - limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}


// export default APIFeatures;
module.exports = APIFeatures;