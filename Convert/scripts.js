const USD = 4.87
const EUR = 5.32
const GBP = 6.08

// obetendo o elementos do formulário / Variáveis
const form = document.querySelector('form')
const amount = document.getElementById('amount')
const currency = document.getElementById('currency')
const footer = document.querySelector('main footer')
const description = document.getElementById('description')
const result = document.getElementById('result')

// manipulando o input para receber apenas números
amount.addEventListener('input', () => {
  const hasCharactersRegex = /\D+/g
  amount.value = amount.value.replace(hasCharactersRegex, '')
})

// capturando o evendo de submit do formulário

form.onsubmit = event => {
  event.preventDefault()

  switch (currency.value) {
    case 'USD':
      convertCurrency(amount.value, USD, 'US$')
      break
    case 'EUR':
      convertCurrency(amount.value, EUR, '€')
      break
    case 'GBP':
      convertCurrency(amount.value, GBP, '£')
      break
  }
}

// função para converter a moeda

function convertCurrency(amount, price, symbol) {
  try {
    //exibindo a cotação da moeda selecionada
    description.textContent = `${symbol} 1 = ${formatCurrencyBRL(price)}`

    // calcula o total
    let total = amount * price

    //verificar se o resultado não e um número.
    if (isNaN(total)) {
      return alert('por favor, digite o valor corretamente')
    }

    // formata o valor total
    total = formatCurrencyBRL(total).replace('R$', '')
    // exibir o resultado total
    result.textContent = `${total} Reais`

    // aplica a classe que exibe o footer para mostrar o resultado
    footer.classList.add('show-result')
  } catch (error) {
    // remove a classe do footer ocultando-o
    footer.classList.remove('show-result')
    console.log(error)
    alert('tente novamente')
  }
}

// formata a moeda em real brasileiro
function formatCurrencyBRL(value) {
  return Number(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}
