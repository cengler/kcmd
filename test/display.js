import assert from 'assert'
import display from './../src/util/display'
import { expect } from 'chai'
import sinon from 'sinon'
import config from './../src/services/config'

describe('display', () => {
  describe('print', () => {
    before(function() {
     sinon.stub(console, 'log');
     sinon.stub(console, 'table');
    });

    it('raw print', function() {
      config.setStringConfig(config.CONFIG_DISPLAY, 'raw')
      display.print(['test string'])
      expect( console.log.calledOnce ).to.be.true;
      expect( console.log.calledWith('test string') ).to.be.true;
    });

    it('table print', function() {
      config.setStringConfig(config.CONFIG_DISPLAY, 'table')
      display.print(['test string'])
      expect( console.table.calledOnce ).to.be.true;
      expect( console.table.calledWith(['test string']) ).to.be.true;
    });


  })
})
