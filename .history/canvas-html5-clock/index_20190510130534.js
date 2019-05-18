
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

let radius = 50
let center = {
  x: 200,
  y: 200
}
ctx.beginPath()
ctx.moveTo(10, 10)
ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)