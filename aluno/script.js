"use strict";
// Café Central — JavaScript didático, sem bibliotecas externas.
const CATALOGO = {
  cafe: { nome: "Café expresso", preco: 6 },
  pao: { nome: "Pão de queijo", preco: 8 },
  bolo: { nome: "Fatia de bolo", preco: 12 },
  suco: { nome: "Suco natural", preco: 10 }
};
const CHAVE_ARMAZENAMENTO = "cafe-central-pedidos-aula12";
const $ = (id) => document.getElementById(id);
const formatarMoeda = (valor) => valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

// Estado inicial dos pedidos.
let pedidos = [];

function salvarPedidos() {
  try { localStorage.setItem(CHAVE_ARMAZENAMENTO, JSON.stringify(pedidos)); }
  catch (erro) { console.warn("Não foi possível salvar os pedidos:", erro); }
}

function mostrarMensagem(texto, erro = false) {
  const mensagem = $("mensagemFormulario");
  mensagem.textContent = texto;
  mensagem.classList.toggle("erro", erro);
}

function valorEstimado() {
  const produto = CATALOGO[$("produto").value];
  const quantidade = Number($("quantidade").value);
  const valor = produto && Number.isInteger(quantidade) && quantidade > 0 ? produto.preco * quantidade : 0;
  $("previsaoValor").textContent = formatarMoeda(valor);
}

function criarPedido(evento) {
  evento.preventDefault();
  const cliente = $("cliente").value.trim();
  const produtoId = $("produto").value;
  const quantidade = Number($("quantidade").value);
  if (!cliente || !CATALOGO[produtoId] || !Number.isInteger(quantidade) || quantidade < 1 || quantidade > 30) {
    mostrarMensagem("Preencha o cliente, o produto e uma quantidade entre 1 e 30.", true);
    return;
  }
  const produto = CATALOGO[produtoId];
  const pedido = {
    id: Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
    cliente, produtoId, produtoNome: produto.nome, quantidade,
    total: produto.preco * quantidade, status: "Pendente"
  };
  pedidos.push(pedido);
  salvarPedidos();
  renderizar();
  $("formPedido").reset();
  valorEstimado();
  mostrarMensagem("Pedido cadastrado com sucesso!");
}

function concluirPedido(id) {
  const pedido = pedidos.find((item) => item.id === id);
  if (!pedido) return;
  pedido.status = "Concluído";
  salvarPedidos();
  renderizar();
}

function renderizar() {
  const lista = $("listaPedidos");
  lista.replaceChildren();
  const termo = $("pesquisa").value.trim().toLocaleLowerCase("pt-BR");
  const visiveis = pedidos.filter((p) =>
    p.cliente.toLocaleLowerCase("pt-BR").includes(termo) ||
    p.produtoNome.toLocaleLowerCase("pt-BR").includes(termo)
  );
  if (!visiveis.length) {
    const vazio = document.createElement("p");
    vazio.className = "vazio";
    vazio.textContent = pedidos.length ? "Nenhum pedido encontrado." : "Nenhum pedido registrado. Cadastre o primeiro pedido!";
    lista.append(vazio);
  }
  for (const pedido of visiveis) {
    const artigo = document.createElement("article"); artigo.className = "pedido";
    const topo = document.createElement("div"); topo.className = "pedido-topo";
    const titulo = document.createElement("h3"); titulo.textContent = pedido.cliente;
    const etiqueta = document.createElement("span"); etiqueta.className = "etiqueta"; etiqueta.textContent = pedido.status;
    topo.append(titulo, etiqueta);
    const detalhe = document.createElement("p");
    detalhe.textContent = `${pedido.quantidade} × ${pedido.produtoNome} · ${formatarMoeda(pedido.total)}`;
    const rodape = document.createElement("div"); rodape.className = "pedido-rodape";
    const codigo = document.createElement("small"); codigo.textContent = `Pedido ${pedido.id.slice(-5).toUpperCase()}`;
    const botao = document.createElement("button"); botao.type = "button"; botao.className = "botao botao-secundario";
    botao.textContent = pedido.status === "Concluído" ? "Concluído" : "Concluir";
    botao.disabled = pedido.status === "Concluído";
    botao.addEventListener("click", () => concluirPedido(pedido.id));
    rodape.append(codigo, botao); artigo.append(topo, detalhe, rodape); lista.append(artigo);
  }
  $("totalPedidos").textContent = pedidos.length;
  $("pedidosPendentes").textContent = pedidos.filter((p) => p.status === "Pendente").length;
  $("valorTotal").textContent = formatarMoeda(pedidos.reduce((soma, p) => soma + p.total, 0));
}

// Configura o evento de envio do formulário.
const formulario = $("formPedidos");
if (formulario) formulario.addEventListener("submit", criarPedido);
$("produto").addEventListener("change", valorEstimado);
$("quantidade").addEventListener("input", valorEstimado);
$("pesquisa").addEventListener("input", renderizar);
valorEstimado();
renderizar();
