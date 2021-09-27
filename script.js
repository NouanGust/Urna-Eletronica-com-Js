// Variáveis de controle de interface
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricao = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let lateral = document.querySelector('.d-1-direita');
let numeros = document.querySelector('.d-1-3');

// Variáveis de controle de ambiente
let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

// Funções
function comecarEtapa(){
    let etapa = etapas[etapaAtual]
    let numeroHtml = '';
    numero = '';
    

    for(let i=0; i<etapa.numeros; i++){
        if(i === 0){
            numeroHtml += '<div class="numero pisca"></div>';       
        } else{
            numeroHtml += '<div class="numero "></div>';
        }
        
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;

}

function atualizaInterface(){
   let etapa = etapas[etapaAtual];
   let candidato = etapa.candidatos.filter((item)=>{
        if(item.numero === numero){
            return true;
        } else{
            return false;
        }
   })
   if(candidato.length > 0){
       candidato = candidato [0];
       seuVotoPara.style.display = 'block';
       aviso.style.display = 'block';
       descricao.innerHTML = `Nome: ${candidato.nome}<br/> Partido: ${candidato.partido}`;
       
       let fotosHtml = '';
       for(let i in candidato.fotos){
           if(candidato.fotos[i].pequeno){
                fotosHtml += `<div class="d-1-imagem pequeno"><img src="imagens/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda}`
           } else{
                fotosHtml += `<div class="d-1-imagem"><img src="imagens/${candidato.fotos[i].url}" alt=""/> ${candidato.fotos[i].legenda}`
           }
            
       }
       lateral.innerHTML = fotosHtml;
   } else{
       seuVotoPara.style.display = 'block';
       aviso.style.display = 'block';
       descricao.innerHTML = '<div class= "aviso--grande pisca">VOTO NULO</div>';
   }
}

function clicou(n){
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca')
        if(elNumero.nextElementSibling !== null){
            elNumero.nextElementSibling.classList.add('pisca') 
        } else{
            atualizaInterface();
        }
        

    }
}

function branco(){
    if(numero === ''){
         votoBranco = true;
         seuVotoPara.style.display = 'block'
         aviso.style.display = 'block'
         numeros.innerHTML = '';
         descricao.innerHTML = '<div class= "aviso--grande pisca">VOTO EM BRANCO</div>';
         lateral.innerHTML = ''      
    } else{
        alert('Para votar em BRANCO você não pode ter digitado um número, porfavor CORRIJA e tente novamente')
    }
}

function corrige(){
    comecarEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual];

    let votoConfirmado = false;

    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado){
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa();
        } else{
            document.querySelector('.tela').innerHTML ='<div class="aviso--gigante pisca">FIM</div>';
            console.log(votos) 
        }
    }
}

comecarEtapa();