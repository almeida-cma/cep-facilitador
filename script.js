// Adicionando um ouvinte de evento no elemento com ID 'cep'. O evento é 'blur', que é disparado quando um elemento perde o foco.
document.getElementById('cep').addEventListener('blur', function() {

    // Pegando o valor do elemento (input) e removendo quaisquer caracteres não numéricos.
    let cep = this.value.replace(/\D/g, '');

    // Verificando se o CEP tem um comprimento diferente de 8. Se sim, ele não é válido.
    if(cep.length !== 8) {
        alert('CEP inválido.');  // Mostra um alerta para o usuário informando que o CEP é inválido.
        return;  // Sai da função.
    }

    // Buscando as informações do CEP usando a API do ViaCEP.
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
        .then(response => response.json())  // Converte a resposta em um objeto JSON.
        .then(data => {
            // Verificando se a resposta da API tem a propriedade 'erro'. Se sim, o CEP não foi encontrado.
            if(data.erro) {
                alert('CEP não encontrado.');  // Mostra um alerta para o usuário.
                return;  // Sai da função.
            }

            // Preenchendo os campos do formulário com as informações retornadas da API.
            document.getElementById('logradouro').value = data.logradouro;
            document.getElementById('bairro').value = data.bairro;
            document.getElementById('cidade').value = data.localidade;
            document.getElementById('uf').value = data.uf;
        })
        .catch(error => {
            // Caso ocorra algum erro na requisição, ele será exibido no console.
            console.error("Erro ao buscar o CEP: ", error);
        });
});

// Adicionando um ouvinte de evento no elemento com ID 'myForm' para o evento de envio ('submit').
document.getElementById('myForm').addEventListener('submit', function(e) {

    e.preventDefault();  // Previne o comportamento padrão de envio do formulário.

    // Valida o campo de e-mail usando a função 'validateEmail'. Se for inválido, mostra um alerta.
    if(!validateEmail(document.getElementById('email').value)) {
        alert('E-mail inválido.');  // Mostra um alerta informando que o e-mail é inválido.
        return;  // Sai da função.
    }

    alert('Formulário enviado com sucesso!');  // Mostra um alerta informando que o formulário foi enviado com sucesso.
});

// Função para validar um endereço de e-mail.
function validateEmail(email) {

    // Expressão regular para validar e-mails com formatos comuns.
    const re = /^[\w._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    // Testa se o e-mail (convertido para minúsculas) corresponde à expressão regular. Retorna 'true' se for válido, 'false' caso contrário.
    return re.test(email.toLowerCase());
}
