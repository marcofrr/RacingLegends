//lista de categorias
var urlCategorias = "http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories";

document.addEventListener("DOMContentLoaded", function (event) {
    //ecraCategorias();
    ecraCategorias();

});
function grab(url) {


    // O fetch é parecido com o $.ajax, mas usa o Promise nativo
    // em vez de um objecto específico do jQuery
	return fetch(url, { headers: { Accept: 'application/json' } })
		.then(function (resposta) {
			if (resposta.status === 200) {
				return resposta.json();
			} else {
				return Promise.reject(new Error("Erro ao obter categorias"));
			}
		});
}

/**
 * Mostra pilotos no ecrã.
 *
 * @param {Array<{ name: string, id: string, nickname: string? }>} arrayDePilotos
 */
function mostraCategorias(categorias) {
    // `arrayDePilotos` é um Array. A função `forEach` do Array
    // é uma alternativa ao ciclo `for`.
    // A função que é passada por parâmetro é invocada para
    // cada item do array.
    var catDiv = document.getElementById("categorias");
    categorias.forEach(function (categoria) {
        var lblNome = document.createElement("h1");
        var lblDesc = document.createElement("p");
        var lblImg = document.createElement("img");
        var divImg = document.createElement("div");
        var div = document.createElement("div");
        
        lblNome.textContent = categoria.name;
        lblDesc.textContent = categoria.description;
        lblImg.src = catImg(categoria.id);
        div.id = categoria.id;
        div.className = "cat";
        divImg.className = "catImagem";

        divImg.appendChild(lblNome);
        divImg.appendChild(lblDesc);
        divImg.appendChild(lblImg);
        div.appendChild(divImg);
        catDiv.appendChild(div);
    });
}

function mostraPilotosCat(categoria) {
    var pilotoDiv = document.getElementById("pilotos");

    categoria.forEach(function (piloto) {
        var lblNome = document.createElement("p");
        var lblNation = document.createElement("p");
        var lblPiloto = document.createElement("img");
        var div = document.createElement("div");

        lblNome.textContent = piloto.name;
        lblNome.className ="piloto"
        lblNation.textContent = piloto.nationality;
        lblPiloto.src = pilotoImg(piloto.id);
        div.setAttribute("id", piloto.id);

        div.appendChild(lblNome);
        div.appendChild(lblNation);
        div.appendChild(lblPiloto);
        pilotoDiv.appendChild(div);
    });

}
function mostraDetalhes(piloto) {
    var detalhesDiv = document.getElementById("detalhes");

    var div = document.createElement("div");
    div.id = "teste";

    var nome = document.createElement("p");
    var alcunha = document.createElement("p");
    var dataNasc = document.createTextNode("p");
    var dataMorte = document.createElement("p");
    var primeiraVitoria = document.createElement("p");
    var nVitoria = document.createElement("p");
    var campeonatos = document.createElement("p");
    var intro = document.createElement("p");
    var img = document.createElement("img");


    img.src = pilotoImg(piloto.id);

    nome.textContent ="Nome: " + piloto.name;
    alcunha.textContent ="Alcunha: " + piloto.nickname;
    dataNasc.textContent = "Data de Nascimento: " + piloto.birth_date;
    dataMorte.textContent = "Data da Morte: " + piloto.death_date;
    primeiraVitoria.textContent = "Primeira Vitória: " + piloto.records.first_race_win;
    nVitoria.textContent = "Número de Vitórias:"  + piloto.records.race_victories;
    campeonatos.textContent = "Campeonatos ganhos: " + piloto.records.championship_victories;
    intro.textContent = piloto.introduction;

    div.appendChild(nome);
    div.appendChild(alcunha);
    div.appendChild(dataNasc);
    div.appendChild(dataMorte);
    div.appendChild(primeiraVitoria);
    div.appendChild(nVitoria);
    div.appendChild(campeonatos);
    div.appendChild(intro);
    div.appendChild(img);

    for (var i = 0; i < piloto.career.length; i++) {
        var titlo = document.createElement("p");
        var texto = document.createElement("p");
        titlo.textContent = piloto.career[i].title;
        texto.textContent = piloto.career[i].text;
        div.appendChild(titlo);
        div.appendChild(texto);

    }

    detalhesDiv.appendChild(div);
    
}
function detalhes(pilotoId) {
    return string = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/' + pilotoId;
}

function ecraDetalhes(pilotoId) {
    return grab(detalhes(pilotoId))
        .then(function (piloto) {
            mostraDetalhes(piloto);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}
function ecraCategorias() {
    return grab(urlCategorias)
        .then(function (categorias) {
            mostraCategorias(categorias);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//devolve os pilotos pertencenetes a uma categoria
function ecraPilotosCat(catId) {
    return grab(catPilotos(catId))
        .then(function (categoria) {
            mostraPilotosCat(categoria);
        })
        .catch(function (erro) {
            console.error(erro);
        });
}

//recebe o id de uma categoria, troca do div das categorias para o do pilotos e mostra os pilotos dessa categoria
function catPiloto(id) {
    document.getElementById("categorias").style.display = "none";
    document.getElementById("pilotos").style.display = "block";
    
    ecraPilotosCat(catPilotos(id));

}

function muda() {
    //ecraCategorias();
    
    document.getElementById("categorias").style.display = "flex";
    document.getElementById("pilotos").style.display = "none";
    document.getElementById("detalhes").style.display = "none";
    document.getElementById("teste").innerHTML = " ";
    //$('element:visible').style.display = "none";


}

$(document).on("click onclick", '#categorias > div', function () {
    document.getElementById("categorias").style.display = "none";
    document.getElementById("pilotos").style.display = "block";
    //console.log("teste");

    ecraPilotosCat($(this).attr('id'));
    console.log($(this).attr('id'));
});

$(document).on("click onclick", '.piloto', function () {
    //document.getElementById("categorias").style.display = "none";
    //document.getElementById("pilotos").style.display = "block";
    //console.log("teste");

    //ecraPilotosCat($(this).parent().attr('id'));
    document.getElementById("pilotos").style.display = "none";
    //$('element:visible').style.display = "none";
    document.getElementById("detalhes").innerHTML = "";
    ecraDetalhes($(this).parent().attr('id'));
    console.log($(this).parent().attr('id'));
});