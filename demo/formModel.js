export default {
  title1 : {
    rules: {
      label: '基本信息',
      type: 'title'
    }
  },
  testHidde: {
    value: '',
    rules: {
      type: 'hidden'
    }
  },
  button_group: {
    value: '',
    rules: {
      label: 'button_group',
      type: 'za-button_group',
      vRules: 'required',
      options: [{name: '选项1', value:'aaa'},{name: '选项1', value:'ccc'},{name: '选项3', value:'bbb'}]
    }
  },
  text : {
    value: 'this is text',
    rules: {
      label: 'text',
      type: 'za-text'
    }
  },
  income : {
    value: '',
    rules: {
      label: 'Income',
      type: 'za-input',
      vRules: 'required|min:1|max:8',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销',
      extra: {
        text: '万元'
      }
    }
  },
  address : {
    value: {
      "province": "",
      "provinceDesc": "",
      "city": "",
      "cityDesc": "",
      "district": "",
      "districtDesc": "",
      "detail": ""
    },
    rules: {
      label: 'Address',
      subLabel: 'detail',
      type: 'za-address',
      vRules: 'required',
      showDetail: true,
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  birthDay : {
    value: '1986-07-02',
    rules: {
      label: 'birthDay',
      type: 'za-date',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  sex : {
    value: 'M',
    rules: {
      label: 'sex',
      type: 'za-sex',
      vRules: 'required',
      placeholder: '请选择',
      readOnly: false,
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  Married : {
    value: 'Y',
    rules: {
      label: 'Married',
      type: 'za-yesno',
      vRules: 'required',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  CertType : {
    value: '',
    rules: {
      label: 'CertType',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销',
      options: [
        ['xxxx', 'yyyyy', 'zzzzz']
      ]
    }
  },
  bankCard : {
    value: '6226090211632175',
    rules: {
      label: 'bankCard',
      type: 'za-input',
      vRules: 'required|bankcard',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  Reason : {
    value: 'xxxx',
    rules: {
      label: 'Reason',
      type: 'za-textarea',
      vRules: 'required|min:8',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销'
    }
  }
}
