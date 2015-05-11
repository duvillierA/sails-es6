import {expect} from 'chai';
import url from 'url';

const path = url.resolve('../../../', 'api/controllers/UserController.js');
var UserController = require(path);
var {find, findOne, create, update, destroy} = UserController;

describe.only('UserController', () => {

  var req, res;

  beforeEach(() => {
    req = {};
    res = {};
  });

  describe('#find()', () => {
    it('should exists', () => expect(find).to.be.a('function'));
  });

  describe('#findOne()', () => {
    it('should exists', () => expect(findOne).to.be.a('function'));
  });

  describe('#create()', () => {
    it('should exists', () => expect(create).to.be.a('function'));
  });

  describe('#update()', () => {
    it('should exists', () => expect(update).to.be.a('function'));
  });

  describe('#destroy()', () => {
    it('should exists', () => expect(destroy).to.be.a('function'));
  });

});
