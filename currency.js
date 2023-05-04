const droplist = document.querySelectorAll(".droplist select"),
from_moeda = document.querySelector(".from select")
to_moeda = document.querySelector(".to select")
getbutton = document.querySelector("form button")
const apiKey = `6c8f7ca4e4d3f9ca69dea371`

// temos uma variavel i que começa em zero; se i for menor que o tamanho do 
//droplist, adiciona um elemento

for(let i = 0; i < droplist.length; i++){

    // Colocar USA E AFN como pradões do conversor

    for(codigo_moeda in codigo_país) {

        let selected; 
        if(i == 0){
            selected = codigo_moeda == "USD" ? "selected" : "";
        }else if(i == 1 ){

            selected = codigo_moeda == "AOA" ? "selected" : "";

        }

        // Criando caracteres do option para o #value e para texto com o codigo da moeda

        let optionTag = `<option value="${codigo_moeda}" ${selected}>${codigo_moeda}</option>`;
        // colocando as opções dentro do select
        droplist[i].insertAdjacentHTML("beforeend", optionTag)

        // trbalhando na bandeira

        droplist[i].addEventListener("change", e =>{

            carregarbandeira(e.target);
        })


    }

}


function carregarbandeira(element){

    for(code in codigo_país ) {
        // Se cada code de um país for igual ao valor da option
        if(code == element.value){

            let imgtag = element.parentElement.querySelector("img")
            imgtag.src= `https://flagsapi.com/${codigo_país[code]}/flat/64.png`

        }
    }
}


window.addEventListener("load", () =>{

    chekarCambio();
})


getbutton.addEventListener("click", e =>{
    e.preventDefault(); 
    chekarCambio();
})

const iconiversao = document.getElementById("icone")
iconiversao.addEventListener("click", ()=>{

    let tempcod = from_moeda.value
    from_moeda.value = to_moeda.value
    to_moeda.value = tempcod;
    carregarbandeira(from_moeda);
    carregarbandeira(to_moeda);
    chekarCambio();

})



function chekarCambio() {

    const montante = document.querySelector(".montante input")
    const coverttexto = document.querySelector(".taxacambio")
    let montanteVal = montante.value;

    if(montanteVal == "" || montanteVal == "0" ){

        montante.value = "1";
        montanteVal = 1
    }

    
     coverttexto.innerHTML = `obtendo ocambio...`
    let url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from_moeda.value}`;

    fetch(url).then(response => (response.json()).then(result=>{

       let coverter_taxa = result.conversion_rates[to_moeda.value]
       let totalCambio = (montanteVal * coverter_taxa ).toLocaleString('pt-BR', {minimumFractionDigits: 2, maximumFractionDigits: 2});
       coverttexto.innerHTML = `${montanteVal} ${from_moeda.value} = ${totalCambio} ${to_moeda.value} `
        

    }));
}