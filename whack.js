const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

const scoreDisplay = document.querySelector('#score')
const healthDisplay = document.querySelector('#health')
const timerDisplay = document.querySelector('#timer')
const highScoreDisplay = document.querySelector('#highScore')

if(!localStorage.getItem('highScore')) {
  localStorage.setItem('highScore', 0)
}

let score = 0
let hp = 2
let timer

scoreDisplay.innerHTML = `Score: ${score}`
healthDisplay.innerHTML = '❤'.repeat(hp)
highScoreDisplay.innerHTML = `Highscore: ${localStorage.getItem('highScore')}`

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
  circles[rng].color = '#ff0000'
  circles.forEach(circle => circle.draw())
}

function fail() {
  clearInterval(timer)
  timerDisplay.innerHTML = null

  alert(`Final score: ${score}`)

  if(score > localStorage.getItem('highScore')) {
    localStorage.setItem('highScore', score)
    highScoreDisplay.innerHTML = `Highscore: ${localStorage.getItem('highScore')}`
  }

  score = 0
  scoreDisplay.innerHTML = `Score: ${score}`
  hp = 2
  healthDisplay.innerHTML = '❤'.repeat(hp)

  current = null
  circles.forEach(circle => {
    circle.color = '#cccccc'
    circle.draw()
  })
}

function click(canvas, e) {
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  if (current && x <= current.x + 100 && x >= current.x - 100 && y <= current.y + 100 && y >= current.y - 100) {
    score++
    scoreDisplay.innerHTML = `Score: ${score}`
  } else if (current) {
    hp = hp - 1
    healthDisplay.innerHTML = '❤'.repeat(hp)
    if (hp === 0) {
      fail()
      return
    }
  } else {
    let time = 10
    timerDisplay.innerHTML = `${time}`
    timer = setInterval(() => {
      time = time - 1
      timerDisplay.innerHTML = `${time}`

      if(time === 0) {
        fail()
        return
      }
    }, 1000)
  }

  randomize()
}

canvas.addEventListener('mousedown', function(e) {
  click(canvas, e)
})