import assert from 'assert'
import display from './../src/util/display'
import { expect } from 'chai'
import sinon from 'sinon'

describe('display', () => {
  describe('print', () => {
    beforeEach(function() {
     sinon.stub(console, 'log');
    });

    it('raw print', function() {

      display.print(['test string'])
      expect( console.log.calledOnce ).to.be.true;
      expect( console.log.calledWith('test string') ).to.be.true;
    });


  })
})
