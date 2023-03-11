


const ContMusica = document.querySelector('.music-container');
const playBtn = document.querySelector('#play');
const previoBtn = document.querySelector('#prev');
const sigBtn = document.querySelector('#next');
const repBtn = document.querySelector('#repeat');
const subBtn = document.querySelector('#postear');

const audio = document.querySelector('#audio');
const progreso = document.querySelector('.progreso');
const barra_progreso = document.querySelector('.barra-progreso');
const titulo = document.querySelector('#title');
const artist = document.querySelector('#autor');
const singer = document.querySelector('#cantante');
const cover = document.querySelector('#portada');

var repetir = false;
let commentsection = document.getElementById('cuadrocoment');

//manejo de comentarios


//titulo de la cancion
const canciones = ['out of the box', 'What do you fight for', 'Play the hero','Subhuman Self']
const autores = ['Guilty Gear Strive Soundtrack','Daisuke Ishiwatari','Guilty Gear Strive Soundtrack','Guilty Gear Strive Soundtrack']
const cantantes = ['Naoki Hashimoto','Daisuke Ishiwatari','Naoki Hashimoto','AISHA']

//tracking

let cancionIndex = 0;

//cargar canciones

cargarcanciones(canciones[cancionIndex])

//actualizar detalles

function  cargarcanciones(cancion){
    titulo.innerText = cancion;
    artist.innerText = autores[cancionIndex];
    singer.innerText = cantantes[cancionIndex];
    audio.src = `music/${cancion}.mp3`;
    cover.src = `imagenes/${cancion}.jpg`;
}


function correr(){
    ContMusica.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pausar(){
    ContMusica.classList.remove('play')
    playBtn.querySelector('i.fas').classList.remove('fa-pause')
    playBtn.querySelector('i.fas').classList.add('fa-play')

    audio.pause()
    
}
function prevSong() {
    cancionIndex--;

    if (cancionIndex < 0){
        cancionIndex = canciones.length - 1;
    }

    cargarcanciones(canciones[cancionIndex]);
    correr();
}

function nextSonga() {
    if(repetir == false){
    cancionIndex++;
}
    if (cancionIndex > 3){
        cancionIndex = 0;
    }

    cargarcanciones(canciones[cancionIndex]);
    correr();
}

function nextSong() {
    cancionIndex++;

    if (cancionIndex > 3){
        cancionIndex = 0;
    }

    cargarcanciones(canciones[cancionIndex]);
    correr();
}

function updateProgress(e) {




    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progreso.style.width = `${progressPercent}%`;
}
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

function repsong(){

    if (repetir == false){
        repetir = true;
        repBtn.querySelector('i.fas').classList.remove('fa-repeat');
        repBtn.querySelector('i.fas').classList.add('fa-rotate');
    }
    else{
        repetir = false;
        repBtn.querySelector('i.fas').classList.remove('fa-rotate');
        repBtn.querySelector('i.fas').classList.add('fa-repeat');
        
    }
}

//event listener
playBtn.addEventListener('click', () => {
    const isPlaying = ContMusica.classList.contains('play')

    if(isPlaying){
        pausar();
    }
    else{
        correr();
    }
})

class Comentario{
    constructor(user, comentari){
        this.user = user;
        this.comentari = comentari;
    }
}

let posteos = []


let username = document.getElementById('user')
let post = document.getElementById('comentario')

function add(e){
    let usuario = username.value;
    let posteando = post.value;
    let NuevoComent = new Comentario (usuario, posteando);
    posteos.push(NuevoComent);
    console.log(posteos);
    
    writeComentario();
    e.preventDefault();
}

function writeComentario(){
    commentsection.innerHTML = "";
    console.log(posteos.length);
    for(var i = 0; i<posteos.length; i++){
    commentsection.innerHTML += `<h3>${posteos[i].user} dice: </h3> 
    <h4>${posteos[i].comentari}</h4>`;
    }
}

//cambiar cancion

previoBtn.addEventListener('click', prevSong);
sigBtn.addEventListener('click', nextSong);
barra_progreso.addEventListener('click',setProgress);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSonga);
repBtn.addEventListener('click', repsong);
subBtn.addEventListener('click',add);
