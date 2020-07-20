//declaração de variáveis
let infopais;
let pais;
const bordersflag = document.getElementById("flagstela2"); //captura div do HTML
infopais=queryString("pais"); //localiza parametro passado no métido GET
//função que retorna o valor selecionado na tela 1
    function queryString(parameter) {  
        var loc = location.search.substring(1, location.search.length);   
        var param_value = false;   
        var params = loc.split("&");   
        for (i=0; i<params.length;i++) {   
            param_name = params[i].substring(0,params[i].indexOf('='));   
            if (param_name == parameter) {                                          
                param_value = params[i].substring(params[i].indexOf('=')+1)   
            }   
        }   
        if (param_value) {   
            return param_value;   
        }   
        else {   
            return undefined;   
        }   
    }
    console.log(infopais);
//busca por meio da API os dados do país escolhido
fetch(`https://restcountries.eu/rest/v2/alpha/${infopais}`)
.then(res => res.json())
.then(data => carregainfo(data))
.catch(err => console.log("Error:", err));
//função que carrega os dados do pais selecionado
    function carregainfo(dadospais){
    const nome = dadospais;
    document.querySelector("#flagtela2 img").src = nome.flag;
    document.getElementById("nome").innerHTML = nome.name;
    document.getElementById("capital").innerHTML = `${nome.capital}`;
    document.getElementById("população").innerHTML = nome.population.toLocaleString("pt-BR");
    document.getElementById("idioma").innerHTML = nome.languages.filter(l => l.name).map(l => `${l.name}`);
    document.getElementById("região").innerHTML = nome.region;
    document.getElementById("sub-região").innerHTML = nome.subregion;
    carregavizinhos(dadospais);
    }
//função que carrega as informações(bandeiras) dos países vizinhos
    function carregavizinhos(vizinhospais){
        let paisesvizinhos = vizinhospais.borders.length;//.filter(l => l.borders.length).map(l => `${l.borders.length}`);
        console.log(vizinhospais.borders[0]);
        let img = "";
        var border = "";
        for (var i = 0; i< paisesvizinhos;i++){
            border = vizinhospais.borders[i].toLowerCase();
            img +=`<img src="https://restcountries.eu/data/${border}.svg" title="${border}">`;
            console.log(img);
        }
        bordersflag.innerHTML = img;
       
    }
//função de retorno a tela 1 pelo botão voltar
    document.getElementById("voltar").addEventListener("click", function(event){
        window.history.back()
            });
