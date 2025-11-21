console.log("calculadora.js carregado");
console.log('patch operadores carregado');

const _displayEl = document.querySelector('#resultado .valor') || document.querySelector('#resultado') || null;

window.operador = function(sig) {
  sig = String(sig).trim().replace('×','*').replace('÷','/').replace('−','-');
  _displayEl.dataset.prev = _displayEl.textContent || '0';
  _displayEl.dataset.op = sig;
  _displayEl.textContent = '';
};

window.calcular = function() {
  const prev = parseFloat(_displayEl.dataset.prev || '0');
  const op = _displayEl.dataset.op || null;
  const cur = parseFloat(_displayEl.textContent || '0');
  let res;
  if (op === '+') res = prev + cur;
  else if (op === '-') res = prev - cur;
  else if (op === '*') res = prev * cur;
  else if (op === '/') res = cur === 0 ? 'Erro' : prev / cur;
  else res = 'Erro';
  _displayEl.textContent = String(res);
  delete _displayEl.dataset.prev;
  delete _displayEl.dataset.op;
};

window.limpar = function(){
  _displayEl.textContent = '0';
  delete _displayEl.dataset.prev;
  delete _displayEl.dataset.op;
};

window.digite = function(v){
  if(v === '.' && _displayEl.textContent.includes('.')) return;
  if(_displayEl.textContent === '0' || _displayEl.textContent === '') 
    _displayEl.textContent = String(v);
  else 
    _displayEl.textContent += String(v);
};

window.digito = window.digito || window.digite;

window.porcentagem = function(){
  _displayEl.textContent = String(parseFloat(_displayEl.textContent||'0')/100);
};

window.inverter = function(){
  _displayEl.textContent = String(parseFloat(_displayEl.textContent||'0') * -1);
};

const displayEl = document.querySelector('#resultado .valor');

let previous = '';
let op = null;

// ---------------------

function digite(valor) {
  digito(valor);
}

function digito(valor) {
  valor = String(valor);
  if (valor === '.' && displayEl.textContent.includes('.')) return;

  if (displayEl.textContent === '0' || displayEl.textContent === 'Erro') {
    displayEl.textContent = valor;
  } else {
    displayEl.textContent += valor;
  }
}

// ---------------------

function operador(sinal) {
  if (previous && op) calcular();

  previous = displayEl.textContent;
  op = sinal;
  displayEl.textContent = '0';
}

// ---------------------

function limpar() {
  previous = '';
  op = null;
  displayEl.textContent = '0';
}

function inverter() {
  displayEl.textContent = String(parseFloat(displayEl.textContent) * -1);
}

function porcentagem() {
  displayEl.textContent = String(parseFloat(displayEl.textContent) / 100);
}

// ---------------------

function calcular() {
  if (!op || previous === '') return;

  const a = parseFloat(previous);
  const b = parseFloat(displayEl.textContent);
  let resultado = 0;

  switch (op) {
    case '+': resultado = a + b; break;
    case '-': resultado = a - b; break;
    case '*': resultado = a * b; break;
    case '/': resultado = b === 0 ? 'Erro' : a / b; break;
  }

  displayEl.textContent = String(resultado);
  previous = '';
  op = null;
}
let valorAtual = '0';
let valorAnterior = null;
let operacao = null;

function atualizar() {
    document.getElementById("resultado").innerText = valorAtual;
}
function Digite(num) {
    if (valorAtual === "0" && num !== ".") {
        valorAtual = num;
    } else {
        valorAtual += num;
    }
    atualizar();
}

function limpar() {
    valorAtual = "0";
    valorAnterior = null;
    operacao = null;
    atualizar();
}

function inverter() {
    valorAtual = String(parseFloat(valorAtual) * -1);
    atualizar();
}

function porcentagem() {
    valorAtual = String (parseFloat(valorAtual) / 100);
    atualizar();
}

function operador(OP) {
    valorAnterior = parseFloat(valorAtual);
    operacao = operacao;
    valorAtual = "0";
}

function calcular() {
    if (operacao === null) return;
    let atual = parseFloat(valorAtual);
    let resultado;
    switch(operacao) {
        case '+': resultado = valorAnterior + atual; break;
        case '-': resultado = valorAnterior - atual; break;
        case '*': resultado = valorAnterior * atual; break;
        case '/': resultado = atual === 0 ? "Erro" : valorAnterior / atual; break;
    }

    valorAtual = String(resultado);
    operacao = null;
    atualizar();
}

