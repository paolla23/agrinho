let trator;
let colheitas = [];
let pontuacao = 0;
let levandoColheita = false;
let animais = [];

function setup() {
  createCanvas(800, 400);
  trator = {
    x: 100,
    y: 300,
    largura: 60,
    altura: 40
  };

  // Cria colheitas no campo
  for (let i = 0; i < 5; i++) {
    colheitas.push({
      x: random(50, 350),
      y: random(50, 350),
      coletada: false
    });
  }

  // Animais do campo
  for (let i = 0; i < 3; i++) {
    animais.push({
      x: random(50, 350),
      y: random(100, 300),
      tipo: random(['vaca', 'galinha']),
      direcao: random([1, -1])
    });
  }
}

function draw() {
  background(180, 220, 255); // Céu claro

  drawAmbientes();
  drawAnimais();
  drawColheitas();
  drawTrator();
  moverTrator();
  verificarEntrega();

  fill(0);
  textSize(18);
  text("Colheitas entregues: " + pontuacao, 10, height - 10);
}

function drawAmbientes() {
  // Campo
  noStroke();
  fill(50, 180, 70); // Verde campo
  rect(0, 0, width / 2, height);
  fill(255);
  textSize(20);
  text("CAMPO", 30, 30);

  // Cidade
  fill(200); // Cinza claro
  rect(width / 2, 0, width / 2, height);

  // Prédios simples
  fill(150);
  rect(420, 250, 50, 150);
  rect(500, 200, 60, 200);
  rect(600, 230, 40, 170);

  fill(255);
  text("CIDADE", width - 120, 30);

  // Ponto de entrega
  fill(255, 215, 0);
  rect(width - 100, height - 100, 80, 80);
  fill(0);
  textSize(14);
  text("ENTREGA", width - 95, height - 65);
}

function drawTrator() {
  fill(255, 0, 0);
  rect(trator.x, trator.y, trator.largura, trator.altura, 10);

  fill(50);
  ellipse(trator.x + 10, trator.y + trator.altura, 20, 20);
  ellipse(trator.x + trator.largura - 10, trator.y + trator.altura, 25, 25);

  if (levandoColheita) {
    fill(0, 255, 0);
    ellipse(trator.x + trator.largura / 2, trator.y - 10, 15, 15);
  }
}

function moverTrator() {
  if (keyIsDown(LEFT_ARROW)) trator.x -= 3;
  if (keyIsDown(RIGHT_ARROW)) trator.x += 3;
  if (keyIsDown(UP_ARROW)) trator.y -= 3;
  if (keyIsDown(DOWN_ARROW)) trator.y += 3;

  trator.x = constrain(trator.x, 0, width - trator.largura);
  trator.y = constrain(trator.y, 0, height - trator.altura);
}

function drawColheitas() {
  for (let c of colheitas) {
    if (!c.coletada && dist(trator.x, trator.y, c.x, c.y) < 40 && !levandoColheita) {
      c.coletada = true;
      levandoColheita = true;
    }

    if (!c.coletada) {
      fill(255, 140, 0);
      ellipse(c.x, c.y, 20, 20); // Fruta ou colheita
      fill(0);
      textSize(10);
      text("🌽", c.x - 6, c.y + 4);
    }
  }
}

function verificarEntrega() {
  if (
    trator.x + trator.largura > width - 100 &&
    trator.y + trator.altura > height - 100 &&
    levandoColheita
  ) {
    levandoColheita = false;
    pontuacao++;

    let restantes = colheitas.filter(c => !c.coletada);
    if (restantes.length === 0) {
      fill(0);
      textSize(26);
      textAlign(CENTER);
      text("Parabéns! Você colheu tudo com sucesso!", width / 2, height / 2);
    }
  }
}

function drawAnimais() {
  for (let a of animais) {
    if (a.tipo === 'vaca') {
      fill(255);
      rect(a.x, a.y, 30, 20);
      fill(0);
      ellipse(a.x + 5, a.y + 20, 10, 10); // pernas
      ellipse(a.x + 25, a.y + 20, 10, 10);
      textSize(12);
      fill(0);
      text("🐄", a.x + 6, a.y + 15);
    } else if (a.tipo === 'galinha') {
      fill(255);
      ellipse(a.x, a.y, 20, 20);
      fill(255, 0, 0);
      triangle(a.x, a.y, a.x + 5, a.y - 10, a.x - 5, a.y - 10);
      textSize(12);
      fill(0);
      text("🐔", a.x - 6, a.y + 5);
    }

    // Movimento dos animais
    a.x += a.direcao * 1;
    if (a.x < 20 || a.x > width / 2 - 30) {
      a.direcao *= -1;
    }
  }
}
