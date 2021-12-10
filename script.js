let canvas = document.getElementById('stage')
let context = canvas.getContext('2d')
let box = 32
let stage = []
stage[0] = {
  x: 8 * box,
  y: 8 * box
}
let direction = 'right'
let food = {
  x: Math.floor(Math.random() * 15 + 1) * box,
  y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG() {
  context.fillStyle = 'orange'
  context.fillRect(0, 0, 16 * box, 16 * box)
}
function criarCb() {
  for (i = 0; i < stage.length; i++) {
    context.fillStyle = 'green'
    context.fillRect(stage[i].x, stage[i].y, box, box)
  }
}

function drawFood() {
  context.fillStyle = 'black'
  context.fillRect(food.x, food.y, box, box)
}
document.addEventListener('keydown', update)

function update(event) {
  if (event.keyCode == 37 && direction != 'right') direction = 'left'
  if (event.keyCode == 38 && direction != 'down') direction = 'up'
  if (event.keyCode == 39 && direction != 'left') direction = 'right'
  if (event.keyCode == 40 && direction != 'up') direction = 'down'
}

function iniciarJogo() {
  if (stage[0].x > 15 * box && direction == 'right') stage[0].x = 0
  if (stage[0].x < 0 && direction == 'left') stage[0].x = 16 * box
  if (stage[0].y > 15 * box && direction == 'down') stage[0].y = 0
  if (stage[0].y < 0 && direction == 'up') stage[0].y = 16 * box

  for (i = 1; i < stage.length; i++) {
    if (stage[0].x == stage[i].x && stage[0].y == stage[i].y) {
      clearInterval(jogo)
      alert('Fim de Jogo :(')
    }
  }

  criarBG()
  criarCb()
  drawFood()

  let stageX = stage[0].x
  let stageY = stage[0].y

  if (direction == 'right') stageX += box
  if (direction == 'left') stageX -= box
  if (direction == 'up') stageY -= box
  if (direction == 'down') stageY += box

  if (stageX != food.x || stageY != food.y) {
    stage.pop()
  } else {
    ;(food.x = Math.floor(Math.random() * 15 + 1) * box),
      Math.floor(Math.random() * 15 + 1) * box
  }

  let newHead = {
    x: stageX,
    y: stageY
  }
  stage.unshift(newHead)
}
let jogo = setInterval(iniciarJogo, 140)
