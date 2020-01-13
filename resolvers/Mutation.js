const { usuarios, proximoId } = require('../data/db')

function indiceUsuario(filtro) {
    if(!filtro) return -1
    const { id, email } = filtro
    if(id) {
        return usuarios.findIndex(u => u.id === id)
    } else if (email) {
        return usuarios.findIndex(u => u.email === email)
    }
    return -1
}

module.exports = {
    novoUsuario(_, { dados }) {
        const emailExistente = usuarios.some(
            u => u.email === dados.email
        )
        if(emailExistente) {
            throw new Error("E-mail já cadastrado")
        }

        const newUser = {
            id: proximoId(),
            ...dados,
            perfil_id: 1,
            status: 'ATIVO'
        }

        usuarios.push(newUser)
        return newUser
    },
    exlcuirUsuario(_, { filtro }) {
        const indexRemove = indiceUsuario(filtro)
        if(indexRemove < 0) {
            return null
        }
        const excluido = usuarios.splice(indexRemove, 1)
        return excluido ? excluido[0] : null
    },
    alterarUsuario(_, { filtro, dados }) {
        const indexAlter = indiceUsuario(filtro)
        if(indexAlter < 0) {
            return null
        }
        const usuario = {
            ...usuarios[indexAlter],
            ...dados
        }
        usuarios.splice(indexAlter, 1, usuario)
        return usuario
    }
}