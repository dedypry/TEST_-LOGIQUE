

class SuccessResult {
  static make(res) {
    this.res = res;
    return this;
  }

  static send(data) {
    if (data.total) {
      return this.res.status(200).send(
          {
            count: data.total,
            rows: data.results,
          },
      );
    } else {
      return this.res.status(200).send(data);
    }
  }


  static sendMessage(message) {
    return this.res.status(200).send(
        {
          message: message,
        },
    );
  }


  static sendMessageData(data, message, other) {
    return this.res.status(200).send(
        {
          message: message,
          data: data,
          ...other,
        },
    );
  }

  static sendDownload(path, fileName) {
    if (fileName) return this.res.download(path, fileName);
    return this.res.download(path, fileName);
  }
}

module.exports = SuccessResult;
