
let selectedColor = 'black'
window.onload = function() {
  let width = 500
  let height = 500
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext("2d");

  canvas.width = width
  canvas.height = height

  // step 01: 绘制米字格
  drawBGGrid()

  // step 02: 事件监听
  let isMouseDown = false
  let lastPos = {}
  let lastTimestamp = 0
  let lastWidth = -1
  let isTouch = ('ontouchstart' in document) ? true : false
  let touchEvent = {
    touchstart: isTouch ? 'touchstart' : 'mousedown',
    toushmove: isTouch ? 'touchmove' : 'mousemove',
    touchend: isTouch ? 'touchend' : 'mouseup'
  }

  canvas.addEventListener('touchStart', (event) => {
    console.log('tag', event)
    isMouseDown = true
    lastPos = windowToCanvas(event.clientX, event.clientY)
    lastTimestamp = new Date()
  })

  canvas.addEventListener(touchEvent.touchmove, (event) => {
    if (isMouseDown) {
      ctx.strokeStyle = selectedColor
      ctx.beginPath()
      ctx.moveTo(lastPos.x, lastPos.y)
      let curTimestamp = new Date()
      let pos = windowToCanvas(event.clientX, event.clientY)
      let distance = toDistance(pos, lastPos)
      let v = distance / (curTimestamp - lastTimestamp)
      ctx.lineTo(pos.x, pos.y)
      let lineWidth = setLineWidth(v)
      lastWidth = lineWidth
      ctx.lineWidth = lineWidth
      ctx.lineCap = "round"
      ctx.lineJoin = "round"
      ctx.stroke()

      lastPos = pos
      lastTimestamp = curTimestamp
    }
  })
  canvas.addEventListener(touchEvent.touchend, (event) => {
    isMouseDown = false
    lastWidth = -1
    ctx.closePath()
    
  })
  canvas.addEventListener('mouseout', (event) => {
    isMouseDown = false
  })

  function windowToCanvas (cx, cy) {
    let offset = canvas.getBoundingClientRect()
    // console.log(canvas.scrollTop, canvas.offsetTop)
    return {x: cx - offset.left, y: cy - offset.top}
  }

  function toDistance (curPos, lastPos) {
    return Math.sqrt(Math.pow((curPos.x - lastPos.x), 2) + Math.pow((curPos.y - lastPos.y), 2))
  }

  function setLineWidth (v) {
    let width = 0
    if (v < 0.1) {
      width = 20
    } else if (v > 10) {
      width = 1
    } else {
      width = 20 - (v - 0.1) / (10 - 0.1) * (20 - 1)
    }

    if (lastWidth === -1) {
      return width
    }

    width = (lastWidth * 2 + width) / 3
    return width
    // return speed < 0.1 ? 20 : speed > 10 ? 1 : (speed - 0.1)/(10-0.1)*(20-1)
  }

  function drawBGGrid () {
    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, 0)
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()
    ctx.lineWidth = 6
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, height / 2)
    ctx.lineTo(width, height / 2)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(width / 2, 0)
    ctx.lineTo(width / 2, height)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(width, height)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(0, height)
    ctx.lineTo(width, 0)
    ctx.closePath()
    ctx.lineWidth = 1
    ctx.stroke()
  }

  
}

function setStrokeColor (color, event) {
  selectedColor = color
  let child = event.target.parentNode.children
  Array.from(child).forEach(item => {
    if (item.className.indexOf('selected') !== -1) {
      item.className = item.className.replace(/\s?selected/g, '')
    }
  })

  event.target.className += ' selected'
}

function erase () {

}