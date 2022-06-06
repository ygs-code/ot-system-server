import add from './add.js';
import chai from 'chai';
const expect = chai.expect;
export default describe('加法函数的测试', function () {
    it('1 加 1 应该等于 2', function () {
        expect(add(1, 1)).to.be.equal(2);
    });
});

 
