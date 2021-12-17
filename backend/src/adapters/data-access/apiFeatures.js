class ApiFeatures {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }

    limitFields() {
        
        if (this.queryString.fields) {
            this.queryString.fields += ",id,-_id"    
            const fields = this.queryString.fields.split(",").join(" ");
            console.log(fields)
            this.query.select(fields)
        } 
        this.query.select("-_id")
        return this;
    }

    filter() {
        const queryObj = {...this.queryString};
        const excludeFields = ['page', "sort", "limit", "fields"];

        excludeFields.forEach(field => delete queryObj[field])

        let queryStr = JSON.stringify(queryObj)
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

        this.query.find = this.query.find(JSON.parse(queryStr));

        return this;
    }


    sort() {
        let sortBy
        if (this.queryString.sort) {
             sortBy = this.queryString.sort.split(",").join(" ")
        } else {
            sortBy = "-createdAt"
        }
        
        this.query.sort(sortBy)
        return this;
    }

    paginate() {
        let page = this.queryString.page ?? 1;
        let limit = this.queryString.limit ?? 100;
        page = parseInt(page)
        limit = parseInt(limit)


        this.query.skip((page - 1) * limit).limit(limit);

        return this;
    }
}

module.exports = ApiFeatures;

