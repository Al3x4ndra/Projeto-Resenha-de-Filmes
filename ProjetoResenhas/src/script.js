//localStorage
let resenhas = JSON.parse(localStorage.getItem('resenhas')) || [];

const resenhaFilmes = document.getElementById('resenhaFilmes');
const gerenciarResenhas = document.getElementById('gerenciarResenhas');
const resenhaForm = document.getElementById('resenhaForm');

//Atualiza a lista de resenhas na página inicial
function atualizarResenha() {
    if (resenhaFilmes) {
        resenhaFilmes.innerHTML = ''; //Limpa a lista atual
        resenhas.forEach((resenha) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <strong>${resenha.filme}</strong>(${resenha.ano}) - ${resenha.avaliacao}/5
                <img src="${resenha.img}" alt="Poster" style="width:50px; height:75px;">
                <p>${resenha.resenha}</p>
                `;
            resenhaFilmes.appendChild(li);
        });
    }
}

//Exibe as resenhas com opções de editar e remover
function resenhasParaEdicao() {
    if (gerenciarResenhas) {
        gerenciarResenhas.innerHTML = '';
        resenhas.forEach((resenha, index) => {
            let li = document.createElement('li');
            li.innerHTML = `
                <strong>${resenha.filme}</strong> (${resenha.ano}) - ${resenha.avaliacao}/5
                <img src="${resenha.img}" alt="Poster" style="width:50px; height:75px;">
                <br/>
                <button onclick="editarResenha(${index})">Editar</button>
                <button onclick="removerResenha(${index})">Remover</button>
            `;
            gerenciarResenhas.appendChild(li);
        });
    }
}

//Edita uma resenha
function editarResenha(index) {
    const resenha = resenhas[index];
    document.getElementById('addFilme').value = resenha.filme;
    document.getElementById('addAno').value = resenha.ano;
    document.getElementById('addDiretor').value = resenha.diretor;
    document.getElementById('addGenero').value = resenha.genero;
    document.getElementById('addDuracao').value = resenha.duracao;
    document.getElementById('addPais').value = resenha.pais;
    document.getElementById('addResenha').value = resenha.resenha;
    document.getElementById('addAvaliacao').value = resenha.avaliacao;
    document.getElementById('addSinopse').value = resenha.sinopse;
    document.getElementById('addImg').value = resenha.img;

    localStorage.setItem('indexToEdit', index);
    window.location.href = "index.html"; //Redireciona para a página de cadastro para editar
}

//Remove uma resenha
function removerResenha(index) {
    resenhas.splice(index, 1); //Remove a resenha do array
    localStorage.setItem('resenhas', JSON.stringify(resenhas)); //Atualiza o localStorage
    resenhasParaEdicao(); //Atualiza a lista de resenhas
}

//Salva uma nova resenha
function salvarResenha(event) {
    event.preventDefault(); //Evita o recarregamento da página

    const indexToEdit = localStorage.getItem('indexToEdit');

    const novaResenha = {
        filme: document.getElementById('addFilme').value, 
        ano: document.getElementById('addAno').value,
        diretor: document.getElementById('addDiretor').value,
        genero: document.getElementById('addGenero').value,
        duracao: document.getElementById('addDuracao').value,
        pais: document.getElementById('addPais').value,
        resenha: document.getElementById('addResenha').value,
        avaliacao: document.getElementById('addAvaliacao').value,
        sinopse: document.getElementById('addSinopse').value,
        img: document.getElementById('addImg').value
    };

   if (indexToEdit !== null) {
        //Substitui a resenha
        resenhas[indexToEdit] = novaResenha;
        localStorage.removeItem('indexToEdit'); //Remove o índice de edição após salvar
    } else {
        //Se não estiver editando, adiciona uma nova resenha
        resenhas.push(novaResenha);
    }

    localStorage.setItem('resenhas', JSON.stringify(resenhas)); //Salva no localStorage
    atualizarResenha(); //Atualiza a lista de resenhas na página inicial
    limparCampos();
}

//Limpa os campos do formulário após o cadastro/edição
function limparCampos() {
    resenhaForm.reset(); //Limpa os campos do formulário
}

//Salvar e carregar resenhas
if (resenhaForm) {
    resenhaForm.addEventListener('submit', salvarResenha);
}

document.addEventListener('DOMContentLoaded', () => {
    atualizarResenha();
    resenhasParaEdicao();
    
//Verifica se há um índice de edição armazenado
const indexToEdit = localStorage.getItem('indexToEdit');
if (indexToEdit !== null) {
    const resenha = resenhas[indexToEdit];
    //Preenche os campos do formulário se houver uma resenha para editar
    document.getElementById('addFilme').value = resenha.filme;
    document.getElementById('addAno').value = resenha.ano;
    document.getElementById('addDiretor').value = resenha.diretor;
    document.getElementById('addGenero').value = resenha.genero;
    document.getElementById('addDuracao').value = resenha.duracao;
    document.getElementById('addPais').value = resenha.pais;
    document.getElementById('addResenha').value = resenha.resenha;
    document.getElementById('addAvaliacao').value = resenha.avaliacao;
    document.getElementById('addSinopse').value = resenha.sinopse;
    document.getElementById('addImg').value = resenha.img;
}
});