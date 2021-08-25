document.querySelector('.busca').addEventListener('submit', async (event)=>{
    // Previne/não deixa formulário ser enviado, para não atualizar a página.
    event.preventDefault(); // essa função previne o comportamento padrão que é enviar o formulario.

    // Pega o que usuário digitou e coloca na variável input.
    let input = document.querySelector('#searchInput').value;

    // verifica se o usuário não enviou com campo em branco.
    if(input !== '') {
        // Limpa tela antes de motrar resultado pesquisado.
        clearInfo();
        // Mostra msg de carregando para o usuário.
        showWarning('Carregando...');

        // Pega a URL de requisição com a API, para buscar informações de tempo. OBS: monta uma url. (encodeURI() troca espaços e acentuação por caracteres especiais).
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)},{state code}&appid=b190e27c221423fc3e1654576c5d3fcc&units=metric&lang=pt_br`;

        // Faz a consulta.
        let results = await fetch(url); // pega url e passa para results.

        // Pega os resultados e transforma em objetos do javaScript para que consiga ler o resultado do mesmo.
        let json = await results.json();

        // verifica se ouve algum resultado para a cidade digitada.
        if(json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
                humidity: json.main.humidity
            });
        } else {
            // Limpa tela antes de motrar resultado pesquisado.
            clearInfo();
            showWarning('Não encontramos esta localização.');
        }
    } else {
        clearInfo();
    }
});

// Função para mostrar as informações extraidas da API.
function showInfo(json) {
    showWarning(''); // tira o nome carregando depois de pegar os dados.

    // Mostra a grade de resultados.
    document.querySelector('.resultado').style.display = 'block';

    // Preenche cada campo com os resultados.
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`; // Titulo.
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`; // Temperatura.
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`; // Velocidade do vento.

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.humidadeInfo').innerHTML = `${json.humidity}`;

}
// Função Limpa e esconde display da tela.
function clearInfo() {
    showWarning(''); // Limpa a mensagem.
    document.querySelector('.resultado').style.display = 'none';
}

// Função que adiciona a msg para o usuário na div .aviso. (mensagem passada por parâmetro).
function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}