# miniComponents
为微信小程序所使用的一些插件：drawBoard（canvas画板）

## drawBoard
用于微信小程序的canvas画板插件：通过手势滑动在页面上进行简单绘画，拥有 **撤销** **返撤销** **清空画板** 的功能

调用：自定义插件调用的方式
`<draw-board width="750rpx" height="900rpx" bindinitEvent="handleBoard"/>`

##### 插件属性值：
  + **width**: 画板canvas宽度支持rpx、px、百分比
  + **height**: 画板canvas高度支持rpx、px、百分比（高度使用百分比时，嵌套组件的容器需要有高度）
  + **initEven事件监听**：组件初始化完成，可以调用组件内的事件

##### 插件对外调用的函数方法、数据值：
  1. 在页面js中引用插件接口： `let plugin = requirePlugin("myPlugin")`
  2. 调用api接口中的getData函数获取画板对象drawBoard：`let drawBoard = plugin.getData('drawBoard')`
  3. 调用插件开放出来的方法：`drawBoard.clear()`（清楚画板）
  + **revoke**：撤销、返撤销功能*函数*，传参：*type* -“back”（撤销，返回上一笔划）、“next”(返撤销，返回下一笔划)
  + **clear**：清空画板功能*函数*，传参：无
  + **save**：导出画板图功能*函数*，传参：无
  + **canvas**：画板canvas对象*数值*，可用于后续生成图片等操作处理
  + **pathList**：画板上总笔划数组*数值*，属于二维数组：[线[点[]]]（每一笔的每一个点x、y值），可用于判断当前是否无笔划操作
  + **currentPath**：画板上当前笔划索引*数值*，初始值为-1，每增加一笔+1