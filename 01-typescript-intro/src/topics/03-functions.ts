
function addNumber (a: number, b:number):number{
    return a+ b;
}

addNumber(2, 5);

const addNumbersArrow = (a: number, b: number):string =>{
    let c = a + b;
    return 'c';
}

function multiply(firstNumber:number, secondnumber?:number, base: number = 2){
    return firstNumber * base;
}

//const result: number = addNumber(1,2);
//const result2: string = addNumbersArrow(1,2);
//const multiplyResult: number = multiply(5);

//console.log({result, result2, multiplyResult});

interface Character {
    name: string;
    hp: number;
    showHp: () => void
}

const healCharacter = (character:Character, amount:number) => {
    character.hp += amount;
}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp(){
        console.log('Points of life:', this.hp);
    }
}

healCharacter(strider, 10);

strider.showHp();

export{};
