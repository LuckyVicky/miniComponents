var plugin = requirePlugin("myPlugin")
Page({
  data: {
    drawBoard: null, // 画板对象
    image: '' // 画板生成的图
  },
  onShow: () => {
  },
  handleBoard () {
    this.setData({
      drawBoard: plugin.getData('drawBoard')
    })
  },
  revoke (e) {
    let type = e.target.dataset.type
    let { drawBoard } = this.data
    if (drawBoard) {
      drawBoard.revoke(type)
    } else {
      drawBoard = plugin.getData('drawBoard')
      drawBoard && drawBoard.revoke(type)
    }
  },
  clear () {
    let { drawBoard } = this.data
    if (drawBoard) {
      drawBoard.clear()
    } else {
      drawBoard = plugin.getData('drawBoard')
      drawBoard && drawBoard.clear()
    }
  },
  save () {
    let { drawBoard } = this.data
    if (drawBoard) {
      drawBoard.save().then(image => {
        this.setData({ image })
      }).catch(res => { console.log(res) })
    } else {
      drawBoard = plugin.getData('drawBoard')
      drawBoard && drawBoard.save().then(image => {
        this.setData({ image })
      }).catch(res => { console.log(res) })
    }
  }
})