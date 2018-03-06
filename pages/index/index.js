//index.js

let timer;  //计时器
let numAi = 0;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    btnState: false,
    winNum: 0,
    imageAiSrc: '',
    imageUserSrc: '/pages/image/wenhao.jpg',
    gameResult: '',
    srcs: [
      '/pages/image/shitou.jpg',
      '/pages/image/jiandao.jpg',
      '/pages/image/bu.jpg'
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let oldWinNum = wx.getStorageSync('winNum')
    if (oldWinNum != null && oldWinNum != '') {
      this.setData({ winNum: oldWinNum })
    }
    this.timerGo();
  },
  changeForChoose(e) {
    if (this.data.btnState) {
      return;
    }
    console.log(e)
    this.setData({ imageUserSrc: this.data.srcs[e.currentTarget.id] })
    clearInterval(timer);

    let user = this.data.imageUserSrc;
    let ai = this.data.imageAiSrc;
    let num = this.data.winNum;
    let str = '你输了';

    if (user == '/pages/image/shitou.jpg' && ai == '/pages/image/jiandao.jpg') {
      num++;
      str = '你赢了!';
      wx.setStorageSync('winNum', num)
    }
    if (user == '/pages/image/jiandao.jpg' && ai == '/pages/image/bu.jpg') {
      num++;
      str = '你赢了!';
      wx.setStorageSync('winNum', num)
    }
    if (user == '/pages/image/bu.jpg' && ai == '/pages/image/shitou.jpg') {
      num++;
      str = '你赢了!';
      wx.setStorageSync('winNum', num)
    }
    if (user == ai) {
      str = '平局';
    }
    this.setData({
      winNum: num,
      gameResult: str,
      btnState: true
    })
  },
  timerGo() {
    timer = setInterval(this.move, 100);
  },
  move() {
    numAi = parseInt(Math.floor(Math.random() * 3));
    this.setData({ imageAiSrc: this.data.srcs[numAi] })
  },
  again() {
    if (this.data.btnState == false) {
      return;
    }
    this.timerGo();
    this.setData({
      btnState: false,
      gameResult: '',
      imageUserSrc: '/pages/image/wenhao.jpg'
    })

  }
})
