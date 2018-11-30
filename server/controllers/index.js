'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */

module.exports = {
  System: require('./systemCtrl'),
  Course: require('./courseCtrl'),
  noCourse: require('./noCourseCtrl'),
  SellingInfo: require('./sellingInfo')
}
