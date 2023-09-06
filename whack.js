const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

class Circle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.color = '#cccccc'
  }

  draw() {
    ctx.beginPath()
    ctx.arc(this.x, this.y, 100, 0, 2 * Math.PI)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const circle1 = new Circle(100, 100)
const circle2 = new Circle(300, 100)
const circle3 = new Circle(500, 100)
const circle4 = new Circle(100, 300)
const circle5 = new Circle(300, 300)
const circle6 = new Circle(500, 300)
const circle7 = new Circle(100, 500)
const circle8 = new Circle(300, 500)
const circle9 = new Circle(500, 500)

const circles = [circle1, circle2, circle3, circle4, circle5, circle6, circle7, circle8, circle9]

let current = null

circles.forEach(circle => circle.draw())

function randomize() {
  circles.forEach(circle => circle.color = '#cccccc')
  const rng = Math.floor(Math.random() * (9))
  current = circles[rng]
  circles[rng].color = '#00eeee'
  circles.forEach(circle => circle.draw())
}

function click(canvas, e) {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  if(current && x <= current.x + 100 && x >= current.x - 100 && y <= current.y + 100 && y >= current.y - 100) {
    console.log('current: ' + current.y)
  }

  randomize()
}

canvas.addEventListener('mousedown', function(e) {
  click(canvas, e)
})