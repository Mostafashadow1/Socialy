export class APIPagination {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  pagination() {
    const page = this.queryString.page * 3 || 1; //  1
    const limit = this.queryString.limit * 1 || 9; // 9
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}
