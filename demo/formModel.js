export default {
  birthDay: {
    value: '1986-07-02',
    rules: {
      label: 'birthDay',
      type: 'za-date',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  sex: {
    value: 'M',
    rules: {
      label: 'sex',
      type: 'za-sex',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  Married: {
    value: 'Y',
    rules: {
      label: 'Married',
      type: 'za-yesno',
      vRules: 'required',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  CertType: {
    value: 'yyyyy',
    rules: {
      label: 'CertType',
      type: 'za-select',
      vRules: 'required',
      placeholder: '请选择',
      errorMsg: '请输入如何看待寿险营销',
      options: [['xxxx', 'yyyyy', 'zzzzz']]
    }
  },
  bankCard: {
    value: '6226090211632175',
    rules: {
      label: 'bankCard',
      type: 'za-input',
      vRules: 'required|min:18|max:18',
      placeholder: '请输入',
      errorMsg: '请输入如何看待寿险营销'
    }
  },
  Reason: {
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
