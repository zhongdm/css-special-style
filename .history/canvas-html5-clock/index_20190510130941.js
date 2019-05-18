let width = 300
let height = 300
let radius = 50
let center = {
  x: 200,
  y: 200
}

let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
ctx.stroke()