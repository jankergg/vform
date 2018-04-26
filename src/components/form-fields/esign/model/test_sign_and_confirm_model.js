export default {
  'value': {
    'caInfoList': [
      {
        'title': 'idCardPath',
        'cType': 4,
        'minLength': 2,
        'maxLength': 5,
        'errMsgForMin': '身份证照数目不可小于2',
        'imagePathList': [],
        'imgShowList': [],
        'desc': '证件照上传（身份证需要正反面）',
        'signPkgPath': null,
        'signImgPath': null,
        'photoPath': null
      },
      {
        'title': 'accountPath',
        'cType': 4,
        'id': 'aaa',
        'minLength': 2,
        'maxLength': 2,
        'errMsgForMin': '银行卡照片数目不可小于2',
        'imagePathList': [],
        'imgShowList': [],
        'desc': '银行卡正反面上传',
        'signPkgPath': null,
        'signImgPath': null,
        'photoPath': null
      },
      {
        'title': 'eduPath',
        'cType': 4,
        'minLength': 1,
        'maxLength': 2,
        'errMsgForMin': '学历证明照片数目不可小于1',
        'imagePathList': [],
        'imgShowList': [],
        'desc': '学历证明',
        'keyWordRule': {
          'alignMethod': 3,
          'xOffest': 10,
          'yOffest': 10,
          'keyword': '学历证明'
        },
        'signPkgPath': null,
        'signImgPath': null,
        'photoPath': null
      },
      {
        'title': 'oneInchPicPath',
        'cType': 4,
        'minLength': 1,
        'maxLength': 1,
        'errMsgForMin': '一寸免冠照片数目不可小于1',
        'imagePathList': [],
        'imgShowList': [],
        'desc': '一寸免冠照片',
        'signPkgPath': null,
        'signImgPath': null,
        'photoPath': null
      },
      {
        'title': 'signPath',
        'cType': 1,
        'desc': '签名',
        'imagePathList': [],
        'signPkgPath': null,
        'signImgPath': null,
        'photoPath': null
      }
    ]
  }
}

