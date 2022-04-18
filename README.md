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
```
