# vir ~ ~ ~

## 环境准备

  >依赖 jQuery （ 1.x、2.x、3.x ）

  ```html
  <script src="https://unpkg.com/jquery"></script>
  ```

## 安装
### cdn

  ```html
  <script src="https://unpkg.com/vir"></script>
  ```
### npm

  ```bash
  $ npm install vir -D
  # or
  $ yarn add vir -D
  ```

## 快速上手 （ tab 切换 ）
  ```html
  <style>
    /* css */
  </style>

  <div class="demo">
    <ol>
      <li>a</li>
      <li>b</li>
    </ol>
    <ul>
      <li>a</li>
      <li>b</li>
    </ul>
  </div>
  ```

  ```js
  var App = Vir({
    events: {
      'click->ol > li': 'handler'
    },
    watch: {
      index: function (result) {
        var old = result.old
        var index = result.value
        this.$$('ol > li').eq(index).addClass('cur')
        this.$$('ul > li').eq(index).show()
        if (old === void 0) {
          return
        }
        this.$$('ol > li').eq(old).removeClass('cur')
        this.$$('ul > li').eq(old).hide()
      }
    },
    methods: {
      handler: function (e) {
        var index = $(e.currentTarget).index()
        this.set('index', index)
      }
    }
  })

  new App({
    el: ".demo",
    init: function () {
      this.set('index', 0)
    }
  })
  ```

## API

### 语法

```js
// 返回构造函数
var App = Vir(options)
// 实例跟构造函数的 options 会合并（深拷贝）
var app = new App(options)
```

#### options

  * el: String

    > 上下文 dom selector

  * tagName: String | 'div'

    > 没传递 el 参数,将用 tagName 创建一个dom上下文

  * events: Object

    > 绑定dom监听事件

      ```html
      <div class="demo">
        <a href="#">click</a>
        <input type="text">
        <button class="btn">button</button>
      <div>
      ```

      ```js
      var App = Vir()
      var app = new App({
        el: '.demo',
        events: {
          "click", "handle",
          "click->a", "handle",
          "click->.btn", "handle",
          "keydown->input", function(event){
            console.log(event)
          }
        },
        methods: {
          handle: function(event){
            console.log(event)
          }
        }
      })

      ```

  * data: Object

    > 可以用 set/get **方法** 设置/获取 **值**

  * methods: Object

    >  实例化的时候 **合并** 到 实例对象

  * watch: Object

    > **set** 一个变量的时候触发对应回调

      ```js
      var App = Vir()
      var app = new App({
        data: {
          index: 0
        },
        watch: {
          index: function(result){
            /*{
              old: 0,
              value: 1,
              type: 'index'
            }*/
            console.log(result)
          }
        }
      })

      app.set('index', 1)
      ```
  * beforeInit: Function

    > 实例初始化完成前执行

  * init: Function

    > 实例初始化完成执行

  * inited: Function

    > init 完成后执行

### 实例属性

  * $el: jQuery 对象

    > 通过 el 参数转换


### 实例方法（ prototype 继承 ）

  * get( name )

    > 获取 **data** 值

      ```js
      var App = Vir()
      var app = new App({
        data: {
          index: 0
        }
      })

      app.get('index') // -> 0
      ```
  * set( name, value )

    > 设置 **data** 值 （ 会触发 'change' 事件 ）

      ```js
      var App = Vir()
      var app = new App({
        data: {
          index: 0
        }
      })

      app.on('index', function(result){
        /*
          result = {
            old: 0,
            value: 1,
            type: 'index'
          }
        */
        console.log(result)
      })

      app.get('index') // -> 0
      app.set('index', 1) // emit index
      app.get('index') // -> 1

      ```

  * $$( selector, [cache] )

    > 在 **$el ( jquery 对象 )** 下查找对应 dom 可以设置 cache 为 false 清除默认缓存

  * on(name, callback)

    > 自定义 **set** 方法触发事件

      ```js
      var App = Vir()
      var app = new App({
        data: {
          index: 0
        }
      })
      app.on('index', function(result){
        // result.value -> 1
      })
      app.set('index', 1)
      ```
  * once(name, callback)

  * off(name, callback)

  * emit(name, arguments, context)
