import { Injectable } from '@angular/core';
import { ListGrande } from '../listaPalabras';

type Celda = {
  letra: string;
  seleccionado: boolean;
  encontrada: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class SopaLetrasService 
{
  listaPalabras = ListGrande
  palabras:string[] = []

  gridSize: number = 25;
  grid: Celda[][] = [];
  seleccionActual: { fila: number; col: number }[] = [];
  palabrasEncontradas: Set<string> = new Set();
  ultimaCelda: Celda = {letra: '', seleccionado:  false, encontrada: false}

  //Metodo para el OnInit
  generarSopaLetras(): void {
    // Inicializa la matriz vacía
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ letra: '', seleccionado: false , encontrada: false}))
    );

    //Selecciono palabras
    for (let i = 0; i < 10; i++) {
      const index = Math.floor(Math.random() * this.listaPalabras.length);
      this.palabras.push(this.listaPalabras.splice(index, 1)[0]);
    }

    // Inserta palabras en la sopa
    for (const palabra of this.palabras){
      this.insertarPalabra(palabra);
    }

    // Rellena los espacios vacíos con letras aleatorias
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < this.gridSize; i++) {
      for (let j = 0; j < this.gridSize; j++) {
        if (this.grid[i][j].letra === '') {
          this.grid[i][j].letra = letras.charAt(Math.floor(Math.random() * letras.length));
        }
      }
    }
  }

  insertarPalabra(palabra: string): void {
    //Establezco las direcciones a insertar (arriba a abajo y derecha a izquierda por ahora) y un límite de intentos para colocar la palabra
    const direcciones = ['H', 'V'];
    let colocada = false;
    let intentos = 0;

    //Elige una dirección aleatoria para insertar la palabra y una posición aleatoria en la tabla
    while (!colocada && intentos < 100) {
      const direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
      const fila = Math.floor(Math.random() * this.gridSize);
      const col = Math.floor(Math.random() * this.gridSize);

      //Se coloca en horizontal
      if (direccion === 'H') {
        //Compruebo si la palabra cabe en la sopa, y si se puede colocar la palabra en las casillas que estamos intentandol
        if (col + palabra.length <= this.gridSize && this.puedeColocar(fila, col, palabra, 'H')) {
          for (let i = 0; i < palabra.length; i++) {
            this.grid[fila][col + i].letra = palabra[i];
          }
          colocada = true;
        }
        //Se coloca en vertical
      } else {
          //Compruebo si la palabra cabe en la sopa, y si se puede colocar la palabra en las casillas que estamos intentandol
          if (fila + palabra.length <= this.gridSize && this.puedeColocar(fila, col, palabra, 'V')) {
          for (let i = 0; i < palabra.length; i++) {
            this.grid[fila + i][col].letra = palabra[i];
          }
          colocada = true;
        }
      }

      intentos++;
    }
    //Si se sobrepasa el limite de intentos
    if (!colocada) {
      console.warn(`No se pudo colocar la palabra: ${palabra}`);
    }
  }

  //Comprueba que se puede colocar la palabra
  puedeColocar(fila: number, col: number, palabra: string, direccion: 'H' | 'V'): boolean {
    //Miro la letra en la celda que en la que se va a insertar
    for (let i = 0; i < palabra.length; i++) {
      const f = direccion === 'H' ? fila : fila + i;
      const c = direccion === 'H' ? col + i : col;
      const letraActual = this.grid[f][c].letra;

      //Si la celda no es vacía o la misma letra que tenemos que colocar, deja de intentar colocar la palabra
      //UPDATE: Como al marcar una palabra fijamos las letras que la forman, en esta implementación una letra no puede pertenecer a dos palabras.
      //por lo tanto borramos esa condicion del if
      if (letraActual !== '') {
        return false;
      }
    }
    return true;
  }


  toggleSeleccion(fila: number, col: number): void {
    const celda = this.grid[fila][col];
  
    if (celda.encontrada) return; // No permitir cambiar celdas encontradas
  
    celda.seleccionado = !celda.seleccionado;
  
    if (celda.seleccionado) {
      this.seleccionActual.push({ fila, col });
      this.comprobarPosicion()
    } else {
      // Si se deselecciona, eliminarla del array
      this.seleccionActual = this.seleccionActual.filter(
        pos => !(pos.fila === fila && pos.col === col)
      );
    }
  
    this.verificarSeleccion();
  }

  comprobarPosicion(): void{
    //Si es la primera letra que se añade, no se comprueba nada ya que se puede elegir cualquier letra del tablero
    if(this.seleccionActual.length == 1){} 

    else{
      //Comprobamos las dos ultimas selecciones de letras
      const ultimaPos = this.seleccionActual[this.seleccionActual.length - 1]
      const penultimaPos = this.seleccionActual[this.seleccionActual.length - 2]
      console.log('Ultima: ',ultimaPos.fila, ultimaPos.col, 'Penultima: ', penultimaPos.fila, penultimaPos.col)
      //Si están a mas de una casilla en vertical o horizontal en ambas direcciones
      if (((ultimaPos.col - penultimaPos.col > 1 || ultimaPos.col - penultimaPos.col < -1)) || (ultimaPos.fila - penultimaPos.fila > 1  || ultimaPos.fila - penultimaPos.fila < -1)){
        //Deseleccionamos todas las casillas que estuvieran seleccionadas
        for(let i  = 0; i < this.seleccionActual.length - 1; i++){
          this.grid[this.seleccionActual[i].fila][this.seleccionActual[i].col].seleccionado = false
        }
        //Borramos todas las selecciones de formar palabra menos la ultima
        this.seleccionActual = []
        this.seleccionActual.push(ultimaPos)
      }

    }
  }

  verificarSeleccion(): void {
    //Junto las letras seleccionadas para intentar formar una de las palabras
    const palabraFormada = this.seleccionActual
      .map(pos => this.grid[pos.fila][pos.col].letra)
      .join('');

    console.log({palabraFormada})
    //Si la palabra está bien seleccionada, se marca como encontrada, para cambiar el color de las casillas y que no se puedan deseleccionar
    if (this.palabras.includes(palabraFormada) && !this.palabrasEncontradas.has(palabraFormada)) {
      for (const pos of this.seleccionActual) {
        this.grid[pos.fila][pos.col].encontrada = true;
        this.grid[pos.fila][pos.col].seleccionado = false; // Ya no es seleccionable
      }

      this.palabrasEncontradas.add(palabraFormada); //Se guarda la palabra encontrada en el set para marcarla en la lista como encontrada
      this.seleccionActual = []; // Vaciar selección actual
    }
  }
  
}
