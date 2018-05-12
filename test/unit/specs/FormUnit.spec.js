import Vue from 'vue';
import {
  formUnit,
  zaInput,
  zaSelect
} from '../../../src/components';

describe('formUnit', () => {
  it('正确生成formUnit实例', () => {
    const Constructor = Vue.extend(formUnit);
    const vm = new Constructor().$mount();
    expect(typeof vm.commit)
      .to.equal('function')
    expect(typeof vm.innerModel)
      .to.equal('function')
    expect(typeof vm.validateAll)
      .to.equal('function')
    expect(typeof vm.resetFormValues)
      .to.equal('function')
  });
});
