var api = require('../../api/data.js')
Component({
  properties: {
    width: {
      type: String,
      value: '600rpx'
    },
    height: {
      type: String,
      value: '600rpx'
    }
  },
  data: {
    pathList:[], // 笔划数据列表：二维数组=》面[线[点{}]]
    currentPath: -1, // 当前笔划序号
  },
  ready () {
    // 初始化画板
    let canvas = wx.createCanvasContext('board', this)
    // 画笔设置粗细、线条交叉样式
    canvas.setLineWidth(3)
    canvas.setLineJoin('round')
    this.setData({ canvas })
    api.setData('drawBoard', {
      "canvas": canvas,
      "pathList": this.data.pathList,
      "currentPath": this.data.currentPath,
      "revoke": this.revoke,
      "redraw": this.redraw,
      "clear": this.clear
    })
    this.triggerEvent("initEvent")
  },
  methods: {
    /**
     * 【触摸监听】start
     */
    startHandle (e) {
      // 记录一笔的初始点
      let { pathList, currentPath } = api.getData('drawBoard')
      // 若路径被撤销过，只保留当前有效笔划路径
      if (pathList.length > 0 && currentPath != pathList.length - 1) {
        pathList = pathList.slice(0, currentPath + 1)
      }
      
      // 添加新路径
      pathList.push([].concat(e.touches))
      api.updateData('drawBoard', {
        "pathList": pathList,
        "currentPath": pathList.length < 2 ? 0 : pathList.length - 1
      })
    },
    /**
     * 【触摸监听】move
     */
    moveHandle (e) {
      // 监听每一次移动并画出来形成线（moveTo + lineTo）
      let { canvas, pathList } = api.getData('drawBoard')
      let changedTouches = e.changedTouches
      // 移动到上一点
      let path = pathList[pathList.length - 1]
      let prePoint = path[path.length - 1]
      canvas.moveTo(prePoint.x, prePoint.y)
      // 画下一点
      changedTouches.forEach(item => {
        canvas.lineTo(item.x, item.y)
        pathList[pathList.length - 1].push(item)
      })
      // 描边
      canvas.stroke()
      canvas.draw(true)
      api.updateData('drawBoard', {
        canvas,
        pathList
      })
    },
    /**
     * 【触摸监听】end（画最后一点）
     */
    endHandle (e) {
      // 画结束那一笔
      let { canvas, pathList } = api.getData('drawBoard')
      // 移动到上一点
      let path = pathList[pathList.length - 1]
      let prePoint = path[path.length - 1]
      canvas.moveTo(prePoint.x, prePoint.y)
      // 画下一点
      e.changedTouches.forEach(item => {
        canvas.lineTo(item.x, item.y)
        pathList[pathList.length - 1].push(item)
      })
      canvas.stroke()
      canvas.draw(true)
      api.updateData('drawBoard', {
        canvas,
        pathList
      })
    },
    /**
     * 撤销操作（上一步）
     */
    revoke (type) {
      let { canvas, currentPath, pathList, redraw } = api.getData('drawBoard')
      if (type == "back" && currentPath > -1) {
        currentPath--
      } else if (type == "next" && currentPath < pathList.length-1) {
        currentPath++
      } else {
        return
      }
      // 清除画板
      canvas.clearRect(0, 0, 750, 750)
      canvas.draw(true)
      canvas.save()
      
      // 更新当前所在笔划序号
      api.updateData('drawBoard', {
        currentPath
      })
      // 重画 (往下一步画时，包含当前步骤+1)
      redraw(currentPath)
    },
    /**
     * 重画到哪个步骤
     * @param {*} toIndex 
     */
    redraw (toIndex) {
      let { canvas, pathList } = api.getData('drawBoard')
      for (var i = 0; i < toIndex + 1; i++) {
        pathList[i].forEach((item, index) => {
          if (index == 0) {
            canvas.moveTo(item.x, item.y)
          } else {
            canvas.lineTo(item.x, item.y)
          }
        })
        canvas.stroke()
        canvas.draw(true)
      }
    },
    /**
     * 清除画板
     */
    clear () {
      let { canvas, pathList } = api.getData('drawBoard')
      if (pathList.length == 0) return
      // 清除画板
      canvas.clearRect(0, 0, 750, 750)
      canvas.draw(true)
      canvas.save()
      api.updateData('drawBoard', {
        "canvas": canvas,
        "pathList": [],
        "currentPath": -1
      })
    }
  }
})