
interface Audioplayer {
    audioVolume: number;
    songDuration: number;
    song: string;
    details: Details;
}

interface Details {
    author: string;
    year: number;
}

const audioPlayer: Audioplayer = {
    audioVolume: 90,
    songDuration: 36,
    song: "Safaera",
    details: {
        author: "Conejito Malo",
        year: 2020
    }
}

const song = 'BOOKER T';
const { song:anotherSong, details } = audioPlayer; //Desectructuración del objeto: extraigo la propiedad song del objeto y la puedo renombrar
const { author } = details;

//console.log('Song:', song);
//console.log('Song', anotherSong);
//console.log('Author:', author); 

const [ , , trunks]: string[] = ['Goku', 'Vegeta', 'Trunks']; //Desestructuración de un array.

console.log('Personaje 3:', trunks);

export{};