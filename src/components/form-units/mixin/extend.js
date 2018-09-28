/*
* @Author: jankergg
* @Date:   2018-02-02 15:58:39
* @Last Modified by:   jankergg
* @Last Modified time: 2018-06-19 15:03:15
*/
const msgFormatError = '格式错误'
const usernameError = '请重新录入姓名，只能为中文/ 大写英文字母/半角中文点号'
const usernameLengthError = '请重新录入姓名，字符范围为6~120个字符'
// 信用卡 [0-9]{13,16} 银联卡 ^62[0-5]\d{13,16}$ Visa: ^4[0-9]{12}(?:[0-9]{3})?$
// 万事达：^5[1-5][0-9]{14}$ QQ号码： [1-9][0-9]{4,14}
// 手机号码：^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$
// 身份证：^([0-9]){7,18}(x|X)?$ 密码：^[a-zA-Z]\w{5,17}$ 字母开头，长度在6~18之间，只能包含字母、数字和下划线
// 强密码：^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$ 包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间
// 7个汉字或14个字符：^[\u4e00-\u9fa5]{1,7}$|^[\dA-Za-z_]{1,14}$

let trimStr = function (str) {
  return str
    ? str.replace(/(^\s*)|(\s*$)/g, '')
    : ''
}
export const mobile = {
  messages: {
    cn: (field, args) => '录入不正确'
  },
  validate: (value, args) => {
    return trimStr(value).length === 11
  }
}

export const checkmobile = {
  messages: {
    cn: (field, args) => '录入不正确'
  },
  validate: (value, args) => {
    return /^1[345789]\d{9}$/.test(trimStr(value))
  }
}

// 验证年龄
export const isbirthday = {
  messages: {
    cn: (field, args) => '投保人年龄不得小于16周岁'
  },
  validate: (value, args) => {
    let ret
    // 获得今天的时间
    var date = new Date()
    var startDate = new Date(value)
    var newDate = date.getTime() - startDate.getTime()
    // 向下取整  例如 10岁 20天 会计算成 10岁 如果要向上取整 计算成11岁，把floor替换成 ceil
    var age = Math.floor(newDate / 1000 / 60 / 60 / 24 / 365)
    if (age < 16) {
      ret = false
    }
    return ret
  }
}

// 受益人比例的验证
export const ischeckbenefit = {
  messages: {
    cn: (field, args) => '受益比例必须是在1-100之间'
  },
  validate: (value, args) => {
    return /[1-9]\d?|100/.test(trimStr(value))
  }
}

// 代理人告知 文本框 export const isinput = {   messages: {     cn: (field, args) =>
// '请详述与被保险人关系'   },   validate: (value, args) => {     return
// trimStr(value).length > 0   } } Validator.extend('ischeckinput', isinput)

export const maxnum = {
  messages: {
    cn: (field, args) => '不得大于' + args
  },
  validate: (value, args) => {
    return parseFloat(value) <= parseFloat(args[0])
  }
}
export const minnum = {
  messages: {
    cn: (field, args) => '不得小于' + args
  },
  validate: (value, args) => {
    return parseFloat(value) >= parseFloat(args[0])
  }
}
export const phonenum = {
  messages: {
    cn: (field, args) => field + '电话输入有误'
  },
  validate: (value, args) => {
    const telOrPhone = /^0/.test(trimStr(value))
    if (telOrPhone) {
      return /(^0[0-9]{2,3}-)?[0-9]{7,8}/.test(trimStr(value))
    } else {
      return trimStr(value).length === 11 && /^1[345789]\d{9}$/.test(value)
    }
  }
}

export const acrossline = {
  messages: {
    cn: (field, args) => field + '座机必须包含"-"'
  },
  validate: (value, args) => {
    const telOrPhone = /^0/.test(trimStr(value))
    if (telOrPhone) {
      return /^\d{3,4}-\d{7,8}$/.test(value)
      // return trimStr(value).indexOf('-') == 3 || trimStr(value).indexOf('-') == 4
    } else {
      return trimStr(value).length === 11 && /^1[345789]\d{9}$/.test(value)
    }
  }
}

export const idcard = {
  messages: {
    cn: (field, args) => '身份证' + msgFormatError
  },
  validate: (value, args) => {
    let num = trimStr(value)
    let ret = false
    //  身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
    if (!(/(^\d{15}$)|(^\d{17}([0-9]|X)$)/i.test(num))) {
      return ret
    }

    //  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。  下面分别分析出生日期和校验位
    let arrInt = [
      7,
      9,
      10,
      5,
      8,
      4,
      2,
      1,
      6,
      3,
      7,
      9,
      10,
      5,
      8,
      4,
      2
    ]
    let arrCh = [
      '1',
      '0',
      'X',
      '9',
      '8',
      '7',
      '6',
      '5',
      '4',
      '3',
      '2'
    ]
    let nTemp = 0
    let i = null
    let len = num.length
    let re = null
    let arrSplit = null
    let dtmBirth = null
    if (len === 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/i)
      arrSplit = num.match(re)
      //  检查出生日期是否正确
      dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      if (dtmBirth != 'Invalid Date') {
        //  将15位身份证转成18位  校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        num = num.substr(0, 6) + '19' + num.substr(6, num.length - 6)
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }

        num += arrCh[nTemp % 11]
      }
    } else if (len === 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/i)
      arrSplit = num.match(re)
      // 检查出生日期是否正确
      dtmBirth = new Date(arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4])
      if (dtmBirth != 'Invalid Date') {
        // 检验18位身份证的校验码是否正确。 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
        var valnum
        for (i = 0; i < 17; i++) {
          nTemp += num.substr(i, 1) * arrInt[i]
        }
        valnum = arrCh[nTemp % 11]
        if (valnum === num.substr(17, 1).toUpperCase()) {
          ret = true
        }
      }
    }
    return ret
  }
}

export const bankcard = {
  messages: {
    cn: (field, args) => '银行卡' + msgFormatError
  },
  validate: (value, args) => {
    // return /^\d{16}|\d{19}$/.demo(trimStr(value))
    return /^([1-9]{1})(\d{15}|\d{18})$/.test((value).replace(/\s/g, ''))
  }
}

export const tel = {
  messages: {
    cn: (field, args) => '电话' + msgFormatError
  },
  validate: (value, args) => {
    // return /^1[3|4|5|7|8][0-9]\d{4,8}$/.demo(trimStr(value))
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(trimStr(value))
  }
}

export const zipcode = {
  messages: {
    // cn: (field, args) => '邮编' + msgFormatError
    cn: (field, args) => msgFormatError
  },
  validate: (value, args) => {
    // return /^1[3|4|5|7|8][0-9]\d{4,8}$/.demo(trimStr(value))
    // return /^[1-9][0-9]{5}$/.test(trimStr(value))
    return /^[0-9]{6}$/.test(trimStr(value))
  }
}

export const age = {
  messages: {
    cn: (field, args) => '年龄' + msgFormatError
  },
  validate: (value, args) => {
    // return /^1[3|4|5|7|8][0-9]\d{4,8}$/.demo(trimStr(value))
    return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/.test(trimStr(value))
  }
}

export const password = {
  messages: {
    cn: (field, args) => '密码' + msgFormatError
  },
  validate: (value, args) => {
    let len = trimStr(value).length
    if (len < 6 || len > 20) {
      return false
    }
    return /^(?![^a-zA-Z]+$)(?!\D+$)/.test(trimStr(value))
  }
}

export const cnname = {
  messages: {
    cn: (field, args) => '中文名' + msgFormatError
  },
  validate: (value, args) => {
    return /^[\u4e00-\u9fa5]{2,10}$/.test(trimStr(value))
  }
}

export const username = {
  messages: {
    cn: (field, args) => usernameError
  },
  validate: (value, args) => {
    return /^[\u4e00-\u9fa5a-zA-Z\s]+$/.test(trimStr(value))
  }
}

// 验证名字英文和我中文不能同时存在
export const checkUser = {
  messages: {
    cn: (field, args) => '姓名不允许英文和汉字同时录入'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]+$|^[\u4e00-\u9fa5]+$/.test(trimStr(value))
  }
}

// 验证名字的长度
export const usernameLength = {
  messages: {
    cn: (field, args) => usernameLengthError
  },
  validate: (value, args) => {
    return /^[\u4e00-\u9fa5]{2,60}$|^[A-Za-z\s]{6,120}$/.test(trimStr(value))
  }
}

// 验证名字的长度
export const stringlength = {
  messages: {
    cn: (field, args) => `工作单位2-20个字符`
  },
  validate: (value, args) => {
    let val = trimStr(value)
    if (val.length < 2 || val.length > 20) {
      return false
    }
    return /^([\u2E80-\u9FFF]|\w|[,.。，‘’()'-])*$/.test(trimStr(value))
  }
}

// 验证字节20
export const byte20 = {
  messages: {
    cn: (field, args) => '验证字节20'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]{1,20}$|^[\u4e00-\u9fa5]{1,10}$/.test(trimStr(value))
  }
}

// 验证字节100
export const byte100 = {
  messages: {
    cn: (field, args) => '验证字节50'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]{1,100}$|^[\u4e00-\u9fa5]{1,50}$/.test(trimStr(value))
  }
}

// 验证字节120
export const byte120 = {
  messages: {
    cn: (field, args) => '验证字节120'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]{1,120}$|^[\u4e00-\u9fa5]{1,60}$/.test(trimStr(value))
  }
}

// 验证字节150
export const byte150 = {
  messages: {
    cn: (field, args) => '验证字节150'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]{1,150}$|^[\u4e00-\u9fa5]{1,75}$/.test(trimStr(value))
  }
}

// 验证字节250
export const byte250 = {
  messages: {
    cn: (field, args) => '验证字节250'
  },
  validate: (value, args) => {
    return /^[A-Za-z\s]{1,250}$|^[\u4e00-\u9fa5]{1,125}$/.test(trimStr(value))
  }
}

// 验证是否包含全角
export const isFullWidth = {
  messages: {
    cn: (field, args) => `不得包含空格`
  },
  validate: (value, args) => {
    return !/\s/g.test(value)
  }
}

export const passport = {
  messages: {
    cn: (field, args) => '护照录入信息不正确'
  },
  validate: (value, args) => {
    return trimStr(value).length>=7 && trimStr(value).length<=20
  }
}

export const taipassport = {
  messages: {
    cn: (field, args) => '台胞证录入信息不正确'
  },
  validate: (value, args) => {
    return trimStr(value).length>=10
  }
}
