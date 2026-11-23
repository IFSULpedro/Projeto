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
    { id: 1, clienteId: 1, jogoId: 1, endereco: "Cidade local, Rua lugar, 42", status: "Entregue" }
    ]
    persistir("pedidos", pedidos)
}

function listar(tipo) {
    let retorno = "";
    
    switch (tipo){
        case "jogos":
            jogos.forEach(j => {
            //let categoriaPortuga = p.categoria ? "Sim" : "Não"
            retorno += ` <tr>
                        <td>${j.nome}</td>
                        <td>${j.preco}</td>
                        <td>${j.categoria}</td>
                        <td>${j.disponivel}</td>
                        <td> <button class="btn btn-sm btn-danger" onclick='excluir(${j.id})'>Deletar
                        </button>
                        <button class="btn btn-sm btn-warning" onclick='buscarProForm(${j.id, "jogos"})'>Alterar
                        </button>
                        
                        </td>
                        </tr> `
            })
        break;
        case "clientes":
            clientes.forEach(c => {
            //let categoriaPortuga = p.categoria ? "Sim" : "Não"
            retorno += ` <tr>
                        <td>${c.nome}</td>
                        <td>${c.senha}</td>
                        <td>${c.cartao}</td>
                        <td> <button class="btn btn-sm btn-danger" onclick='excluir(${c.id})'>Deletar
                        </button>
                        <button class="btn btn-sm btn-warning" onclick='buscarProForm(${c.id, "clientes"})'>Alterar
                        </button>
                        
                        </td>
                        </tr> `
            })
        break;
        case "pedidos":
            pedidos.forEach(p => {
            //let categoriaPortuga = p.categoria ? "Sim" : "Não"
            retorno += ` <tr>
                        <td>${p.clienteId}</td>
                        <td>${p.jogoId}</td>
                        <td>${p.endereco}</td>
                        <td>${p.entregue}</td>
                        <td> <button class="btn btn-sm btn-danger" onclick='excluir(${p.id})'>Deletar
                        </button>
                        <button class="btn btn-sm btn-warning" onclick='buscarProForm(${p.id, "pedidos"})'>Alterar
                        </button>
                        
                        </td>
                        </tr> `
            })
        break;
    }
    return retorno
}

function adicionarJogo(nome, preco, categoria, disponivel) {
    //pega o ultimo id disponível e adiciona um para o novo produto
    let novoid = jogos[jogos.length - 1].id + 1
    const novo = { id: novoid, nome: nome, preco: preco, categoria: categoria, disponivel: disponivel }
    jogos.push(novo)
    persistir("jogos", jogos)
    //atualizar a lista
    let resultado = listar("jogos")
    const tabela = document.getElementById("jogosTabela")
    tabela.innerHTML = resultado
}

function adicionarCliente(nome, senha, cartao) {
    //pega o ultimo id disponível e adiciona um para o novo produto
    let novoid = clientes[clientes.length - 1].id + 1
    const novo = { id: novoid, nome: nome, senha: senha, cartao: cartao }
    clientes.push(novo)
    persistir("clientes", clientes)
    //atualizar a lista
    let resultado = listar("clientes")
    const tabela = document.getElementById("clientesTabela")
    tabela.innerHTML = resultado
}

function adicionarPedido(clienteId, jogoId, endereco, entregue) {
    //pega o ultimo id disponível e adiciona um para o novo produto
    let novoid = pedidos[pedidos.length - 1].id + 1
    const novo = { id: novoid, clienteId: clienteId, jogoId: jogoId, endereco: endereco, entregue: entregue }
    pedidos.push(novo)
    persistir("pedidos", pedidos)
    //atualizar a lista
    let resultado = listar("pedidos")
    const tabela = document.getElementById("pedidosTabela")
    tabela.innerHTML = resultado
}

function buscar(id, tipo) {

    switch (tipo) {
        case "jogos":
            const jogos = jogos.find(j => j.id === id)
            if (jogos) { 
                return jogos 
            } else { 
                return null 
            }
        break;
        case "clientes":
            const clientes = clientes.find(c => c.id === id)
            if (clientes) { 
                return clientes 
            } else { 
                return null 
            }
        break;
        case "pedidos":
            const pedidos = pedidos.find(p => p.id === id)
            if (pedidos) { 
                return pedidos 
            } else { 
                return null 
            }
        break;
    }
}

function excluir(id, tipo) {
    const indice = null;

    switch (tipo) {
        case "jogos":
            indice = jogos.findIndex(j => j.id === id)
            if (indice !== -1) {
                jogos.splice(indice, 1)
                persistir("jogos", jogos)
                //atualizar a lista
                let resultado = listar("jogos")
                const tabela = document.getElementById("jogosTabela")
                jogosTabela.innerHTML = resultado

                return true
            }
            else { 
                return false
            }
        break;
        case "clientes":
            indice = clientes.findIndex(c => c.id === id)
            if (indice !== -1) {
                clientes.splice(indice, 1)
                persistir("clientes", clientes)
                //atualizar a lista
                let resultado = listar("clientes")
                const tabela = document.getElementById("clientesTabela")
                clientesTabela.innerHTML = resultado

                return true
            }
            else { 
                return false
            }
        break;
        case "pedidos":
            indice = pedidos.findIndex(p => p.id === id)
            if (indice !== -1) {
                pedidos.splice(indice, 1)
                persistir("pedidos", pedidos)
                //atualizar a lista
                let resultado = listar("pedidos")
                const tabela = document.getElementById("pedidosTabela")
                pedidosTabela.innerHTML = resultado

                return true
            }
            else { 
                return false
            }
        break;
    }
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

function gravarJogo() {
    const nome = document.getElementById("nome").value
    const preco = document.getElementById("preco").value
    const categoria = document.getElementById("categoria").value
    const disponivel = document.getElementById("disponivel").checked
    adicionarJogo(nome, preco, categoria, disponivel)
    //mostra mensagem "bonitinha"
    document.getElementById("formJogo").reset()
}

function gravarCliente() {
    const nome = document.getElementById("nome").value
    const senha = document.getElementById("senha").value
    const cartao = document.getElementById("cartao").value
    adicionarCliente(nome, senha, cartao)
    //mostra mensagem "bonitinha"
    document.getElementById("formCliente").reset()
}

function gravarPedido() {
    const clienteId = document.getElementById("clienteId").value
    const jogoId = document.getElementById("jogoId").value
    const endereco = document.getElementById("endereco").value
    const entregue = document.getElementById("entregue").checked
    adicionarPedido(clienteId, jogoId, endereco, entregue)
    //mostra mensagem "bonitinha"
    document.getElementById("formPedido").reset()
}

function buscarProForm(id, tipo) {

    switch (tipo) {
        case "jogos":
            const j  = buscar(id, "jogos")
            if(p)
            {
                document.getElementById("nome").value = j.nome
                document.getElementById("id").value = j.id
            }
        break;
        case "clientes":
            const c  = buscar(id, "clientes")
            if(p)
            {
                document.getElementById("nome").value = c.nome
                document.getElementById("id").value = c.id
            }
        break;
        case "pedidos":
            const p  = buscar(id, "pedidos")
            if(p)
            {
                document.getElementById("id").value = p.id
            }
        break;
    }
}