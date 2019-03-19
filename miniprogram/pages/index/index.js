var plugin = requirePlugin("myPlugin")
Page({
  data: {
    drawBoard: null
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
  }
})