"use strict";

class Manager {
  constructor(model) {
    this.model = model;
  }

  findOne(conditions = {}, projects = {}, populate = []) {
    return this.model.findOne(conditions, projects).populate(populate);
  }

  findOneWithSort(conditions = {}, projects = {}, options = {}, populate = []) {
    return this.model.findOne(conditions, projects, options).populate(populate);
  }

  exists(conditions = {}) {
    if (Object.keys(conditions).length === 0) {
      return false;
    }
    return this.model.exists(conditions);
  }

  find(
    conditions = {},
    projects = {},
    sorts = {},
    populate = [],
    options = { page: 1, limit: 10 }
  ) {
    options.sort = sorts;
    options.populate = populate;
    options.select = projects;
    return this.model.paginate(conditions, options);
  }

  findAll(conditions = {}, projects = {}, sorts = {}, populate = []) {
    return this.model.find(conditions, projects).sort(sorts).populate(populate);
  }

  update(conditions = {}, value, options = {}) {
    return this.model.updateOne(conditions, value, options);
  }

  findOneAndUpdate(conditions = {}, value, populate = [], options = {}) {
    return this.model.findOneAndUpdate(conditions, value, options).populate(populate)
  }

  updateMany(conditions = {}, value, options = {}) {
    return this.model.updateMany(conditions, value, options);
  }

  create(Obj) {
    const doc = new this.model(Obj);
    return doc.save();
  }

  insertMany(docs) {
    return this.model.insertMany(docs)
  }

  delete(condition) {
    return this.model.deleteOne(condition);
  }

  count(condition) {
    return this.model.countDocuments(condition);
  }

  aggregate(array) {
    return this.model.aggregate(array);
  }

  bulkWrite(updates) {
    return this.model.bulkWrite(updates);
  }
}

module.exports = Manager;
