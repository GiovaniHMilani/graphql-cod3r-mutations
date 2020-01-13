const { perfis } = require('../../data/db')

function indicePerfil(filtro) {
    if(!filtro) return -1
    const { id } = filtro
    if(id) {
        return perfis.findIndex(u => u.id === id)
    }
    return -1
}

function proximoId() {
    const lastId = perfis[perfis.length - 1].id

    return lastId + 1
}

module.exports = {
    novoPerfil(_, { dados }) {
        const perfilExist = perfis.some(p => p.nome === dados.nome)
        if(perfilExist) {
            return new Error("Perfil já cadastrado")
        }

        const newPerfil = {
            id: proximoId(),
            ...dados
        }
        perfis.push(newPerfil)
        return newPerfil
    },
    excluirPerfil(_, { filtro }) {
        const indexPerfil = indicePerfil(filtro)
        if(indexPerfil > 0) {
            return null
        }
        const excluido = perfis.splice(indexPerfil, 1)
        return excluido ? excluido[0] : null
    },
    alterarPerfil(_,{ filtro, dados }) {
        const indexPerfil = indicePerfil(filtro)
        if(indexPerfil < 0) {
            return null
        }
        const newPerfil = {
            ...perfis[indexPerfil],
            ...dados
        }
        perfis.splice(indexPerfil, 1, newPerfil)
        return newPerfil
    }
}