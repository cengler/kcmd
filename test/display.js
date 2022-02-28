import display from './../src/util/display'
import {expect} from 'chai'
import sinon from 'sinon'
import config from './../src/services/config'

let sandbox = sinon.createSandbox();

describe('display', () => {
  describe('print', () => {
    beforeEach(function () {
      sandbox.stub(console, 'log');
      sandbox.stub(console, 'table');
    });

    afterEach(function () {
      sandbox.restore();
    });

    it('raw print', function () {
      config.setStringConfig(config.CONFIG_DISPLAY, 'raw')
      display.print(['test string'])
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith('test string')).to.be.true;
    });

    it('table print', function () {
      config.setStringConfig(config.CONFIG_DISPLAY, 'table')
      display.print(['test string'])
      expect(console.table.calledOnce).to.be.true;
      expect(console.table.calledWith(['test string'])).to.be.true;
    });

    it('tsv string list print', function () {
      config.setStringConfig(config.CONFIG_DISPLAY, 'tsv')
      display.print(['test string', 'second line'])
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith('test string\nsecond line')).to.be.true;
    });

    it('tsv object list print', function () {
      config.setStringConfig(config.CONFIG_DISPLAY, 'tsv')
      display.print([{desc: 'test string', index: 0}, {desc: 'second line', index: 1}])
      expect(console.log.calledOnce).to.be.true;
      expect(console.log.calledWith('desc\tindex\ntest string\t0\nsecond line\t1')).to.be.true;
    });

  })
})
