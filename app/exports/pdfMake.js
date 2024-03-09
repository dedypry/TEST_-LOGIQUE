const path = require('node:path');
const Printer = require('pdfmake');
const {Base64Encode} = require('base64-stream');
const GeneratePDF = {
  make(res) {
    this.res = res;
    return this;
  },

  download(content, fileName = 'document') {
    const fonts = {
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic',
      },
    };
    return new Promise((resolve, reject) => {
      const printer = new Printer(fonts);
      const document = printer.createPdfKitDocument(content);
      this.res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${fileName}.pdf`,
      });
      document.pipe(this.res);
      document.end();
    });
  },
  base64(content, fileName = 'document') {
    const fonts = {
      Times: {
        normal: 'Times-Roman',
        bold: 'Times-Bold',
        italics: 'Times-Italic',
        bolditalics: 'Times-BoldItalic',
      },
    };
    return new Promise((resolve, reject) => {
      const printer = new Printer(fonts);
      const document = printer.createPdfKitDocument(content);
      const stream = document.pipe(new Base64Encode());
      document.end();
      let finalString = '';

      stream.on('data', function(chunk) {
        finalString += chunk;
      });
      stream.on('end', function() {
        resolve(finalString);
      });
    });
  },

  downloadStyleCalibri(content, fileName = 'document') {
    const fonts = {
      Calibri: {
        normal: path.resolve('app/assets/fonts', 'Calibri-Regular.ttf'),
        bold: path.resolve('app/assets/fonts', 'Calibri-Bold.ttf'),
        italics: path.resolve('app/assets/fonts', 'Calibri-Italic.ttf'),
        bolditalics: path.resolve('app/assets/fonts',
            'Calibri-Bold-Italic.ttf'),
      },
    };
    return new Promise((resolve, reject) => {
      const printer = new Printer(fonts);
      const document = printer.createPdfKitDocument(content);
      this.res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${fileName}.pdf`,
      });
      document.pipe(this.res);
      document.end();
    });
  },

  downloadStylePoppins(content, fileName = 'document') {
    const fonts = {
      Poppins: {
        normal: path.resolve('app/assets/fonts', 'Poppins-Regular.ttf'),
        bold: path.resolve('app/assets/fonts', 'Poppins-Bold.ttf'),
        italics: path.resolve('app/assets/fonts', 'Poppins-Italic.ttf'),
        bolditalics: path.resolve('app/assets/fonts', 'Poppins-BoldItalic.ttf'),
      },
    };
    return new Promise((resolve, reject) => {
      const printer = new Printer(fonts);
      const document = printer.createPdfKitDocument(content);
      this.res.writeHead(200, {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment;filename=${fileName}.pdf`,
      });
      document.pipe(this.res);
      document.end();
    });
  },
};
module.exports = GeneratePDF;
