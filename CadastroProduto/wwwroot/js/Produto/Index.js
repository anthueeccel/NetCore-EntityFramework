let descricao = document.getElementById("descricao");
let valor = document.getElementById("valor");
let button = document.getElementById("salvar");
let corpo = document.getElementById("corpo");
let idGeral = 0;

setTimeout(listaProdutos, 20);

button.addEventListener('click', () => {
    if (validaCampos()) {
        descricao.classList.remove('error');
        valor.classList.remove('error');
        if (idGeral === 0) {
            fetch(`/Produto/InserirProduto?descricao=${descricao.value}&valor=${valor.value}`, {
                method: `POST`,
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(
                    limpaCampos(),
                    setTimeout(listaProdutos, 20)
                );

        } else {
            fetch(`/Produto/AlterarRegistro?id=${idGeral}&descricao=${descricao.value}&valor=${valor.value}`, {
                method: `PUT`
            })
                .then(
                    idGeral = 0,
                    button.innerText = "Salvar",
                    limpaCampos(),
                    setTimeout(listaProdutos, 20)
                );
        }
    }
});

function validaCampos() {
    if (descricao.value === "" && valor.value === "") {
        descricao.classList.add('error');
        valor.classList.add('error');
        return false;
    } else if (descricao.value === "" && valor.value !== "") {
        descricao.classList.add('error');
        return false;
    } else if (descricao.value !== "" && valor.value === "") {
        valor.classList.add('error');
        return false;
    } else {
        return true;
    }
}

function limpaCampos() {
    descricao.value = "";
    valor.value = "";
}

function listaProdutos() {
    corpo.innerHTML = "";
    let xml = new XMLHttpRequest();
    xml.open('GET', "/Produto/RetornaProduto", true);
    xml.onreadystatechange = () => {
        if (xml.readyState === 4 && xml.status === 200) {
            let data = JSON.parse(xml.responseText);
            data.forEach((produto, index) => {
                corpo.innerHTML += `<tr>
                                    <td>${produto.descricao}</td>
                                    <td>${produto.valor}</td>
                                    <td><button class="btn btn-warning" onClick="produto(${produto.id}, ${index})">Editar</button></td>
                                    <td><button class="btn btn-danger" onClick="deletarProduto(${produto.id})">Deletar</button></td>
                                    </tr>`;
            });
        }
    };
    xml.send();
}

function deletarProduto(id) {
    if (confirm('Deseja excluir esse produto?')) {
        fetch(`/Produto/DeletaProduto?id=${id}`, {
            method: `DELETE`
        })
            .then(
                setTimeout(listaProdutos, 20)
            );
    }
}

//function deletarProduto(id) {
//    if (confirm('Deseja excluir esse produto?')) {
//        let xml = new XMLHttpRequest();
//        xml.open("DELETE", `/Produto/DeletaProduto?id=${id}`, true);
//        xml.onreadystatechange = () => {
//            if (xml.readyState === 4 && xml.status === 200) {
//                setTimeout(listaProdutos, 20);
//            }
//        };
//        xml.send();
//    }
//}

function produto(id, index) {
    index++;
    let tabela = document.getElementsByTagName('table')[0];
    descricao.value = tabela.rows[index].cells[0].innerHTML;
    valor.value = tabela.rows[index].cells[1].innerHTML;
    idGeral = id;
    button.innerText = "Editar";
}