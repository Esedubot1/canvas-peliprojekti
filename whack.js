const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
canvas.width = 600
canvas.height = 600

var audio = new Audio("vineboom.mp3");
audio.load;

const explosionImage = new Image()
explosionImage.src = 'explosion.png'
const frames = [
  { x: 0, y: 0 },
  { x: 200, y: 0 },
  { x: 400, y: 0 },
  { x: 600, y: 0 },
  { x: 0, y: 200 },
  { x: 200, y: 200 },
  { x: 400, y: 200 },
  { x: 600, y: 200 },
  { x: 0, y: 400 },
  { x: 200, y: 400 },
  { x: 400, y: 400 },
  { x: 600, y: 400 },
  { x: 0, y: 600 },
  { x: 200, y: 600 },
  { x: 400, y: 600 },
  { x: 600, y: 600 }
]
let frameN

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

let previous = null
let current = null

animate()

function randomize() {
  circles.forEach(circle => circle.color = '#cccccc')
  let rng = Math.floor(Math.random() * (9))
  while(rng === circles.indexOf(current)) {
    rng = Math.floor(Math.random() * (9))
  }
  current = circles[rng]
  circles[rng].color = '#ff0000'
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
    previous = current
    frameN = 0
    audio.play();
  audio.currentTime = 0;
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

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  circles.forEach((circle) => circle.draw())

  if(previous) {
    frameN++

    if(frameN < 16) {
      ctx.drawImage(explosionImage, frames[frameN].x, frames[frameN].y, 200, 200, previous.x - 100, previous.y - 100, 200, 200)
    }
  }

  requestAnimationFrame(animate)
}

canvas.addEventListener('mousedown', function(e) {
  click(canvas, e)
})