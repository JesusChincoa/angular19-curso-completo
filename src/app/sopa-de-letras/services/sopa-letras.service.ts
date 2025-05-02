import { Injectable } from '@angular/core';

type Celda = {
  letra: string;
  seleccionado: boolean;
  encontrada: boolean;
};

@Injectable({
  providedIn: 'root'
})
export class SopaLetrasService {

  palabras = ['betis','ALCACHOFA','TOLFIN', 'ISCO', 'ALBONDIGA'].map((palabra) => palabra.toUpperCase())

  gridSize: number = 25;
  grid: Celda[][] = [];
  seleccionActual: { fila: number; col: number }[] = [];
  palabrasEncontradas: Set<string> = new Set();
  isMouseDown: boolean = false;

  //Metodo para el OnInit
  generarSopaLetras(): void {
    // Inicializa la matriz vacía
    this.grid = Array.from({ length: this.gridSize }, () =>
      Array.from({ length: this.gridSize }, () => ({ letra: '', seleccionado: false , encontrada: false}))
    );

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
      if (letraActual !== '' && letraActual !== palabra[i]) {
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
    } else {
      // Si se deselecciona, eliminarla del array
      this.seleccionActual = this.seleccionActual.filter(
        pos => !(pos.fila === fila && pos.col === col)
      );
    }
  
    this.verificarSeleccion();
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

  //Si el click esta pulsado, se añaden las celdas
  onMouseDown(fila: number, col: number): void {
    this.isMouseDown = true;
    this.toggleSeleccion(fila, col);
  }
  
  //Si el click esta pulsado y entro en otra celda, se selecciona
  onMouseEnter(fila: number, col: number): void {
    if (this.isMouseDown) {
      this.toggleSeleccion(fila, col);
    }
  }
  
  //Metodo para agregar las celdas arrastrando, y verificar la palabra nada mas completarla
  agregarCeldaSeleccionada(fila: number, col: number): void {
    const celda = this.grid[fila][col];
  
    if (celda.encontrada || celda.seleccionado) return;
  
    celda.seleccionado = true;
    this.seleccionActual.push({ fila, col });

    this.verificarSeleccion()
  
  }
  
}
