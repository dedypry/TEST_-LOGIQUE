/**
 * @extends Error
 */
class InvalidData extends Error {
  constructor(message, status=422) {
    super(message);

    this.name = this.constructor.name;
    this.status = status;
    this.message = 'Invalid Input Data! ' + message? message: '';
  }

  /**
   *
   * @param {*} err
   * @param {*} req
   * @param {*} res
   * @param {*} next
   */
  handle(err, req, res, next) {
    // console.log('Use custom action here..');
  }
}

module.exports = InvalidData;
