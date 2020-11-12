export function valida(input) {
    const tipoDeInput = input.dataset.tipo

    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput](input)
    }

    if(input.validity.valid) {
        input.closest('.input-container').classList.remove('input-container--invalido')
        input.closest('.input-container').querySelector('span').innerHTML = ''
    } else {
        input.closest('.input-container').classList.add('input-container--invalido')
        input.closest('.input-container').querySelector('span').innerHTML = pegaMensagemDeErro(tipoDeInput, input)
    }
}

const tiposDeErro = [
    'valueMissing',
    'typeMismatch',
    'tooShort',
    'patternMismatch',
    'customError'
]

const mensagensDeErro = {
    nome: {
        valueMissing: 'O nome não pode estar vazio'
    },
    email: {
        valueMissing: 'O email não pode estar vazio',
        typeMismatch: 'O email digitado não é válido'
    },
    senha: {
        valueMissing: 'A senha não pode estar vazia',
        tooShort: 'A senha é muito curta',
        patternMismatch: 'A senha deve conter entre 6 e 12 caractéres e deve conter um número e uma letra maiúscula'
    },
    dataNascimento: {
        valueMissing: 'A data não pode estar vazia',
        customError: 'Você deve ser maior de 18 anos para se cadastrar'
    }
}

const validadores = {
    dataNascimento: input => validaDataNascimento(input)
}

function pegaMensagemDeErro(tipoDeInput, input) {
    let mensagem = ''
    tiposDeErro.forEach( erro => {
        if(input.validity[erro]) {
            mensagem = mensagensDeErro[tipoDeInput][erro]
        }
    })
    
    return mensagem
}

function validaDataNascimento(input) {
    const dataRecebida = new Date(input.value)
    let mensagem = ''

    if(!maiorQue18(dataRecebida)) {
        mensagem = 'Você deve ser maior de 18 anos para se cadastrar'
    }
    
    input.setCustomValidity(mensagem)
}

function maiorQue18(data) {
    const dataDeHoje = new Date()
    const data18Anos = new Date(
        data.getUTCFullYear()+18,
        data.getUTCMonth(),
        data.getUTCDate()
    )
    
    return data18Anos <= dataDeHoje
}
