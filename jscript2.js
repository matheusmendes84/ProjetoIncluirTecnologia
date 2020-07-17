let infopais;
let pais;
const bordersflag = document.getElementById("flagstela2");
infopais=queryString("pais");

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
fetch(`https://restcountries.eu/rest/v2/alpha/${infopais}`)
.then(res => res.json())
.then(data => carregainfo(data))
.catch(err => console.log("Error:", err));

    function carregainfo(dadospais){
    const nome = dadospais;//.find(country => country.currencies.filter(c => c.code).map(c => `${c.code}`) == nomedopais);
   // console.log(nome);
    document.querySelector("#flagtela2 img").src = nome.flag;
    document.getElementById("nome").innerHTML = nome.name;
    document.getElementById("capital").innerHTML = `${nome.capital}`;
    document.getElementById("população").innerHTML = nome.population.toLocaleString("pt-BR");
    document.getElementById("idioma").innerHTML = nome.languages.filter(l => l.name).map(l => `${l.name}`);
    document.getElementById("região").innerHTML = nome.region;
    document.getElementById("sub-região").innerHTML = nome.subregion;
    carregavizinhos(dadospais);
    }

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

    document.getElementById("voltar").addEventListener("click", function(event){
        window.history.back()
            });