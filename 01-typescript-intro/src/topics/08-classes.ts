

export class Person{
    //public name: string;
    //private address: string;
    
    constructor(
        public name:string, 
        private address:string = 'No Adrress') 
        {
        this.name = name;
        this.address = address;
    }
}

/*export class Hero extends Person{

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
    ){
        super( realName, 'Colonia Santa Ines');
    }
}
*/

export class Hero{

    //public person: Person;

    constructor(
        public alterEgo: string,
        public age: number,
        public realName: string,
        public person: Person
    ){
        //this.person = new Person(realName);
    }
}

const peter = new Person('Peter Parker', 'NY');
const tony = new Person('Tony Stark', 'NY');

const spiderman = new Hero('SpiderMan', 17, 'NY', peter);

const ironman = new Hero('Nino Bravo',45,'Sebas', tony);

console.log(spiderman);
console.log(ironman);