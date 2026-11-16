let jogos = recuperarRegistros("jogos")

if(!jogos) {
    jogos = [
    { id: 1, nome: "Elden Ring", preco: 160.00, tipo: "Ação", disponivel: true }
    ]
    persistir("jogos", jogos)
}

let clientes = recuperarRegistros("clientes")

if(!clientes) {
    clientes = [
    { id: 1, nome: "Pessoa", senha: "1234", cartao: "1234567890" }
    ]
    persistir("clientes", clientes)
}

let pedidos = recuperarRegistros("pedidos")

if(!pedidos) {
    pedidos = [
    { id: 1, precoTotal: 300.00, clienteId: 1, jogosId: [1, 2], endereco: "Cidade local, Rua lugar, 42", status: "Entregue" }
    ]
    persistir("pedidos", pedidos)
}

function listar() {
    let retorno = "";
    prods.forEach(p => {
        //let categoriaPortuga = p.categoria ? "Sim" : "Não"
        retorno += ` <tr>
                    <td>${p.nome}</td>
                    <td>${p.preco}</td>
                    <td>${p.categoria}</td>
                    <td>${p.disponivel}</td>
                    <td> <button class="btn btn-sm btn-danger" onclick='excluir(${p.id})'>Deletar
                    </button>
                    <button class="btn btn-sm btn-warning" onclick='buscarProForm(${p.id})'>Alterar
                    </button>
                    
                    </td>
                    </tr> `
    })
    return retorno
}

function adicionar(nome, preco, categoria, disponivel) {
    //pega o ultimo id disponível e adiciona um para o novo produto
    let novoid = prods[prods.length - 1].id + 1
    const novo = { id: novoid, nome: nome, preco:preco, categoria:categoria, disponivel:disponivel }
    prods.push(novo)
     persistir("produtos", prods)
    //atualizar a lista
    let resultado = listar()
    const tabela = document.getElementById("tabela")
    tabela.innerHTML = resultado
}

function buscar(id) {
    const prod = prods.find(p => p.id === id)
    if (prod) { return prod }
    else { return null }
}

function excluir(id) {
    const indice = prods.findIndex(p => p.id === id)
    if (indice !== -1) {
        prods.splice(indice, 1)
        persistir("produtos", prods)
        //atualizar a lista
        let resultado = listar()
        const tabela = document.getElementById("tabela")
        tabela.innerHTML = resultado

        return true
    }
    else { return false }
}

function persistir(chave, valorJson) {
    localStorage.setItem(chave, JSON.stringify(valorJson));
}

function recuperarRegistros(chave) {
    const regs = localStorage.getItem(chave)
    if (regs) {
        return JSON.parse(regs)
    }
    else {
        return null
    }
}

function gravarDoForm() {
    const nome = document.getElementById("nome").value
    const preco = document.getElementById("preco").value
    const categoria = document.getElementById("categoria").value
    const disponivel = document.getElementById("disponivel").checked
    adicionar(nome,preco,categoria,disponivel)
    //mostra mensagem "bonitinha"
    document.getElementById("formulario").reset()
}

function buscarProForm(id) {
    const p  = buscar(id)
    if(p)
    {
        document.getElementById("nome").value = p.nome
        document.getElementById("id").value = p.id
    }
}