# lagou-mobile-edu

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### learn log
```
1.动态设置rem插件：
(1)npm i amfe-flexible -S  
(2)npm i postcss-pxtorem -D
遇到的问题：--> ①这二者是搭配使用，而不是单一使用，前者设置html根元素的font-size，后者设置body；②注意版本，postcss-pxtorem使用5.1.1版本且为开发依赖，amfe-flexible使用2.1.1版本且为运行依赖；

2.对于course-list组件，上拉刷新后再此触底更新时报错，显示key重复，因为上拉刷新已经重新获取了currentPage为1的列表项，在触底时又获得了currentPage为1的列表项，所以key重复导致报错：
-->  解决办法： 每次刷新后由count记录刷新次数，count++，判断是否经过了刷新[count!==0就经过了刷新]，刷新了就让列表list为空，但是我们不应该每次触底都让list为空，否则就拿不到之前push进去的数据了，所以我们应该在第一次触底后把count归0，解决掉refresh状态，这样的话，既解决了报错又解决了重复数据问题!!!!

3.对于course-list组件，由于会被学习页面复用，其中后台返回的数据信息接口可能不一致，所以我们在给list赋值时要谨慎：如-->在选课course界面的list赋值时，需要经过以下判断：if(data.data&&data.data.records&&data.data.records.length!==0) { 满足条件才可以赋值--> this.list = data.data.records }

4.对象转urlencoded形式的方法：(1)手动拼接(2)qs.stringify(obj) (3)浏览器移动端特有：new URLSearchParams(obj).toString()

5.注意在进行本地状态存储或者会话级存储时，服务端返回的string,所以可以直接存储在localStorage/sessionStorage中，但是Vuex的state中我们读取数据时应该使用JSON.parse()转换为对象格式方便查看!

6. 给user读取本地存储时如果读取不到结果，要用 null 而不是 {} ,这很重要

7.Vue项目中后台传递的富文本格式的代码需要单独设置其css样式，且不能scoped才能生效！

8.阿里云点播服务配置项：
(1)静态资源引入css、js:
<link rel="stylesheet" href="https://g.alicdn.com/de/prismplayer/2.9.19/skins/default/aliplayer-min.css" />
<script src="https://g.alicdn.com/de/prismplayer/2.9.19/aliplayer-h5-min.js"></script>
(2)接口请求成功后实例化阿里云视频对象H5:
    var player = new window.Aliplayer({
      // 挂载的元素
      id: 'video-container',
      width: '100%',
      height: '100%',
      vid: data.content.fileId, //  必选参数。音视频ID。示例：1e067a2831b641db90d570b6480f****。
      playauth: data.content.playAuth, //  必选参数。音视频播放凭证。
      format: 'mp4' // 必须配置format
      // qualitySort: 'asc',
      // mediaType: 'video',
      // autoplay: true,
      // isLive: false,
      // playsinline: true,
      // preload: true,
      // rePlay: false,
      // controlsBraVisibility: 'hover',
      // useH5Prism: true
    }, function (player) {
      console.log('The player is created.')
    })

9. 正则表达式的分组处理：this.$store.state.user.organization.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
一般来说，对vue组件内部的数据处理时，使用filters/computed

10.scoped组件内部深层选择器：  >>>   ::v-deep  /deep/
```
