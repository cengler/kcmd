"use strict";

var _assert = _interopRequireDefault(require("assert"));

var _display = _interopRequireDefault(require("./../src/util/display"));

var _chai = require("chai");

var _sinon = _interopRequireDefault(require("sinon"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

describe('display', function () {
  describe('print', function () {
    beforeEach(function () {
      _sinon["default"].stub(console, 'log');
    });
    it('raw print', function () {
      _display["default"].print(['test string']);

      (0, _chai.expect)(console.log.calledOnce).to.be["true"];
      (0, _chai.expect)(console.log.calledWith('test string')).to.be["true"];
    });
  });
});
//# sourceMappingURL=display.js.map