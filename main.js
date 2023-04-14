"use strict";

const openModal = () => {
  document.getElementById("modal").classList.add("active");
};

const closeModal = () => {
  clearFields();
  document.getElementById("modal").classList.remove("active");
};
const setBanco = (data) => {
  localStorage.setItem("crud", JSON.stringify(data));
};
const getBanco = () => {
  const banco = JSON.parse(localStorage.getItem("crud")) ?? [];
  return banco;
};

const readClient = () => {
  const banco = getBanco();
  return banco;
};

const deleteClient = (index) => {
  const db_client = getBanco();
  db_client.splice(index, 1);
  setBanco(db_client);
};
const fillFields = (client) => {
  document.getElementById("nome").value = client.nome;
  document.getElementById("email").value = client.email;
  document.getElementById("celular").value = client.celular;
  document.getElementById("cidade").value = client.cidade;
  document.getElementById("nome").dataset.index = client.index;
};
const updateClient = (index, client) => {
  const db_client = getBanco();
  db_client[index] = client;
  setBanco(db_client);
};

const createClient = (client) => {
  const db_client = getBanco();
  console.log(db_client);
  db_client.push(client);
  setBanco(db_client);
};
const isValidFields = () => {
  return document.getElementById("form").reportValidity();
};
const clearFields = () => {
  const input = document.querySelectorAll(".modal-field");
  input.forEach((input) => (input.value = ""));
};
const saveClient = () => {
  if (isValidFields()) {
    const client = {
      nome: document.getElementById("nome").value,
      email: document.getElementById("email").value,
      celular: document.getElementById("celular").value,
      cidade: document.getElementById("cidade").value,
    };
    const index = document.getElementById("nome").dataset.index;
    if (index == "new") {
      createClient(client);
      clearFields();
      atualizarTela();
    } else {
      updateClient(index, client);
      atualizarTela();
      closeModal();
    }
    closeModal();
  }
};
const createRow = (client, index) => {
  const tBody = document.getElementsByTagName("tbody")[0];
  const newRow = document.createElement("tr");
  newRow.innerHTML = `
    <td>${client.nome} </td>
    <td>${client.email}</td>
    <td>${client.celular}</td>
    <td>${client.cidade}</td>
    <td>
      <button type="button" class="button green" id="edit-${index}"> Editar</button>
      <button type="button" class="button red" id="delete-${index}"> Excluir</button>
      </td>
  `;
  tBody.appendChild(newRow);
};
const editClient = (index) => {
  const client = getBanco()[index];
  client.index = index;
  fillFields(client);
  openModal();
};

const editDelete = (evento) => {
  if (evento.target.type == "button") {
    const [action, index] = evento.target.id.split("-");

    if (action == "edit") {
      editClient(index);
    } else if (action == "delete") {
      deleteClient(index);
    }
  }
  atualizarTela();
};

const clearTable = () => {
  const rows = document.querySelectorAll("tbody>tr");
  rows.forEach((row) => row.parentNode.removeChild(row));
};
const atualizarTela = () => {
  const db_client = getBanco();
  clearTable();
  db_client.forEach(createRow);
};
document
  .getElementById("cadastrarCliente")
  .addEventListener("click", openModal);

document.getElementById("modalClose").addEventListener("click", closeModal);

document.getElementById("salvar").addEventListener("click", saveClient);

atualizarTela();
document.getElementsByTagName("tbody")[0].addEventListener("click", editDelete);
