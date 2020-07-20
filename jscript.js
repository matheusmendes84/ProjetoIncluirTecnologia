//Declaração de Variáveis
let regioes;
let pais;
let escolha;
let flagpaises;
let paises;
let paisescolhido;
//Identificação de elementos da página HTML
const listaregioes = document.getElementById("regiões");
const listapaises = document.getElementById("países");
const paisesflag = document.getElementById("flag");
//Consulta a API e inicialização dos dados
fetch("https://restcountries.eu/rest/v2/all")
.then(res => res.json())
.then(data => inicializaregioes(data))
.catch(err => console.log("Error:", err));
//Função que preenche os dados das listas de regiões e países
function inicializaregioes(dadosregioes){
    regioes = dadosregioes.map(function(reg){return{region: reg.region};});  
    paises = dadosregioes; 
    let options ="";
    let options2 ="";
    regioes = regioes.filter(function (a) {
        return !this[JSON.stringify(a)] && (this[JSON.stringify(a)] = true);
    }, Object.create(null))
    regioes.forEach(região => options +=`<option value="${região.region}">${região.region}</option>`); 
    paises.forEach(pais => options2 +=`<option value="${pais.alpha3Code}">${pais.name}</option>`); 
    console.log(paises);
    listapaises.insertAdjacentHTML("afterbegin", options2);
    console.log(regioes);
    listaregioes.insertAdjacentHTML("afterbegin", options);
}

//Identificação de qual lista considerar
listapaises.addEventListener("change", function(event){
    console.log(event.target.value);
    listaregioes.value = "1";
  });
  listaregioes.addEventListener("change", function(event){
    console.log(event.target.value);
    listapaises.value = "1";
  });

//Conjunto de ações a ser realizada pelo botão pesquisar, com base na lista considerada
  document.getElementById("pesquisar").addEventListener("click", function(event){
    escolha = listaregioes.options[listaregioes.selectedIndex].value;
    console.log(escolha);
    if(escolha != "1"){
    fetch(`https://restcountries.eu/rest/v2/region/${escolha}`)
    .then(res => res.json())
    .then(data => displayflags(data))
    .catch(err => console.log("Error:", err));
    }else{
        escolha = listapaises.options[listapaises.selectedIndex].value;
        console.log(escolha);
    fetch(`https://restcountries.eu/rest/v2/alpha/${escolha}`)
    .then(res => res.json())
    .then(data => displayflag(data))
    .catch(err => console.log("Error:", err));
    }    
});
//Função de carregamento das bandeiras dos países da região selecionada
function displayflags(dadosflags){
    flagpaises = dadosflags;
    let img = "";
    flagpaises.forEach(flag => img +=`<a href="tela2.html?pais=${flag.alpha3Code}"><img src="${flag.flag}" title="${flag.name}"></a>`);
    paisesflag.innerHTML = img;
    console.log(img);
}
//Função de carregamento da bandeira do país selecionado
function displayflag(dadosflags){
    console.log(dadosflags);
    flagpaises = dadosflags;
    let img = `<a href="tela2.html?pais=${flagpaises.alpha3Code}"><img src="${flagpaises.flag}" title="${flagpaises.name}"></a>`;
    paisesflag.innerHTML = img;
    console.log(img);
}

