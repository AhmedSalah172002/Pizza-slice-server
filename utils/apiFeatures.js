class ApiFeatures{
    constructor(mongooseQuery, queryString) {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
      }

    filter(){
        const queryStringObj={...this.queryString}
        const excludesFields = ['page', 'sort', 'limit', 'fields','keyword'];
        excludesFields.forEach(field => delete queryStringObj[field]);
        let queryStr = JSON.stringify(queryStringObj);
        //convert 
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt|ne)\b/g, (match) => `$${match}`);
        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
    }

    sort(){
        if(this.queryString.sort){
            const sortBy=this.queryString.sort.split(",").join(" ");
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else {
            this.mongooseQuery = this.mongooseQuery.sort('-createAt');
        }
        return this;
    }

    limitFields() {
        if (this.queryString.fields) {
          const fields = this.queryString.fields.split(',').join(' ');
          this.mongooseQuery = this.mongooseQuery.select(fields);
        } else {
          this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
      }

      search() {
        if (this.queryString.keyword) {
          let query = {};
            query.$or = [
              { name: { $regex: this.queryString.keyword, $options: 'i' } },
              { description: { $regex: this.queryString.keyword, $options: 'i' } },
            ];
          this.mongooseQuery = this.mongooseQuery.find(query);
        }
        return this;
      }

      paginate(countDocuments) {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 5;
        // if page= 2 , limit= 5 , skip= (2-1) * 5 = 5  , page 2 skip 5 documents
        const skip = (page - 1) * limit;
        // to get last element
        const endIndex = page * limit;
    
        // Pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;
        // if countDocuments= 50 , limit = 4  , numberOfPages= 50 / 4 = 12.5 ~ 13 
        pagination.numberOfPages = Math.ceil(countDocuments / limit);
    
        // next page
        if (endIndex < countDocuments) {
          pagination.next = page + 1;
        }
        if (skip > 0) {
          pagination.prev = page - 1;
        }
        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    
        this.paginationResult = pagination;
        return this;
      }
    }
    
module.exports = ApiFeatures;
    