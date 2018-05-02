/**
 auth: jankergg
 desc: 全局 mixin工具方法，添加工具方法请以 '__' 为前缀
 Warning: 添加全局方法须谨慎，非必要情况请把全局方法添加到 base/settings !!!!!
 last-modify: 2017-11-16 19:51:32
 */
export default {
  methods: {
    // toast 提示的简单封装，主要是为了方便调用
    __toast (msg) {
      if (!this.$vux) {
        return alert('请检查vux组件是否引入！！')
      }
      // this.$vux.toast.show({
      //   text: msg,
      //   type: 'text',
      //   width: '50%',
      //   isShowMask: true
      // })
    },
    // 节流方法，防止短时间内大量重复触发调用
    __bounce (time) {
      var timer = time || 50
      var counter = null
      return {
        // 等到动作完成，最后再触发
        do: function (fun) {
          if (counter) {
            clearTimeout(counter)
          }
          counter = setTimeout(function () {
            counter = null
            fun(counter)
          }, timer)
        },
        // 固定时间内触发，忽略后续输入
        end: function (fun) {
          if (counter) {
            return
          }
          counter = setTimeout(function () {
            fun()
            counter = null
          }, timer)
        }
      }
    },
    __delay (ms) {
      return new Promise(resolve => setTimeout(resolve(true), ms))
    },
    // 从对象提取指定的属性，生成新对象
    __attach (attr, ele) {
      let obj = {}
      if (arguments.length === 2) {
        if (Array.isArray(attr)) {
          attr.forEach(prop => {
            obj[prop] = ele[prop]
          })
        } else {
          for (let i in attr) {
            if (attr.hasOwnProperty(i)) {
              obj[i] = ele[i]
            }
          }
        }
      } else {
        throw new Error('必须2个参数')
      }
      return obj
    },
    __num2cn (index) {
      return ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'][index - 1]
    },
    __resetObj (o) {
      if (typeof o === 'string') {
        return ''
      }
      const __reset = obj => {
        for (let a in obj) {
          if (typeof obj[a] === 'string') {
            obj[a] = ''
          } else if (typeof obj[a] === 'number') {
            obj[a] = null
          } else {
            __reset(obj[a])
          }
        }
        return obj
      }
      return __reset(o)
    },
    __if (obj, value) {
      try {
        // eslint-disable-next-line
        const res = eval(obj)
        return res === value
      } catch (e) { }
      return false
    },
    __getFirstProp (obj) {
      for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
          return obj[prop]
        }
      }
    },
    // 修改api返回的数据以适应组件需要
    // {name: {value:000, name:'123'}} ==> {name: {value:000, name:'name'}}
    // model: 安全更新
    __fixInputName (data, model) {
      let obj = this.__keyValue({}, data)
      this.__fixInputNames__ = {}
      for (let i in obj) {
        // if (!/^\d+$/.demo(i)) {
        // }
        if (obj[i].name && obj[i].value) {
          this.__fixInputNames__[i] = obj[i]
          obj[i].name = i
        }
      }
      if (model) {
        obj = Object.assign(model, obj)
      }
      return obj
    },
    // 修改组件输出结果，按api要求重组数据结构, 与__fixInputName过程相反
    // {name: {value:000, name:'name'}} ==> {name: {value:000, name:'123'}}
    __recapOutputName (data) {
      let obj = this.__clone(data)
      for (let i in this.__fixInputNames__) {
        if (obj[i] !== undefined) {
          let __v = obj[i]
          obj[i] = this.__fixInputNames__[i]
          obj[i].value = __v
          __v = null
        }
      }
      return obj
    },
    __values (obj) {
      return Object.values(obj)
    },
    __keys (obj) {
      return Object.keys(obj)
    },
    // {a:1,b:2} => {a: {key: a, value: 1}, b: {key: a, value: 2}}
    __keyValue (target, obj) {
      for (let i in obj) {
        target[i] = {}
        target[i].name = i
        target[i].value = obj[i]
      }
      return target
    },
    __plan (obj) {
      let newobj = {}
      // debugger
      for (let i in obj) {
        if (obj[i].name === undefined || obj[i].value === undefined) {
          alert('参数不符合要求，必须为{name: {name: "name",value:"value"}形式')
          return
        }
        newobj[obj[i].name] = obj[i].value
      }
      return newobj
    },
    // __keyValue 的ob版，生成能被vue监听的对象
    __obkv (target, obj) {
      for (let i in obj) {
        if (!target[i]) {
          target[i] = {}
        }
        this.$set(target[i], 'name', i)
        this.$set(target[i], 'value', obj[i])
      }
      return target
    },
    __getUrlParam (param) {
      let a = {}
      try {
        window.location.href.split('?')[1].split('&').map((e, i, arr) => {
          a[e.split('=')[0]] = decodeURIComponent(e.split('=')[1])
        })
        return a[param]
      } catch (e) {
        return null
      }
    },
    __str (obj) {
      return JSON.stringify(obj)
    },
    __s2o (str) {
      let o = null
      try {
        o = JSON.parse(str)
      } catch (e) {
        alert(e)
      }
      return o
    },
    __isObj (obj) {
      return typeof obj === 'object' && !this.__isArray(obj)
    },
    __isArray (obj) {
      return Array.isArray(obj)
    },
    __clone (obj) {
      return this.__obj(obj)
    },
    __obj (obj) {
      let o = this.__str(obj)
      return JSON.parse(o)
    }
  }
}
