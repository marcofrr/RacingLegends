// Este exemplo mostra como fazer um pedido AJAX com o fetch.
//recebe o id da categoria e retorna a imagem descritiva
function catImg(catId) {
    return string = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + catId + '/image';
}

//recebe o id da categoria e retorna os pilotos dessa categoria
function catPilotos(catId) {
    return string = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/categories/' + catId + '/drivers';
}
//recebe o id do piloto e retorna a sua imagem
function pilotoImg(pilotoId) {
    return string = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/'+pilotoId+'/image';
}

//recebe o ID de um piloto, e retorna uma Promise com o objecto dos dados do piloto
function detalhes(pilotoId) {
    return string ='http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/'+pilotoId ;
}

//recebe o ID do piloto e o ID de uma imagem multimédia, e constrói um URL para uma imagem multimédia de um piloto
function img(pilotoId, imgId) {
    return string = 'http://ipt-ti2-racinglegends-api.eu-gb.mybluemix.net/api/v1/drivers/ ' + pilotoId + '/multimedia/images/' + imgId + '/image';

}
