// Execption when user not found
/**
 * @extends Error
 */
class DataNotFound extends Error {
  /**
   * @param  {string} message
   */
  constructor(message) {
    super(message);

    this.name = this.constructor.name;
    this.status = 404;
    this.message = message || 'Data not found!';
  }
  /**
   * Custom action when error happen
   */
  handle() {
    // console.log('Use custom action here..');
  }
}

module.exports = DataNotFound;
