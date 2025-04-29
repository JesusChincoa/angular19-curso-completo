
export interface Passenger {
    name:string;
    children?:string[];
}

const passenger1:Passenger = {
    name: 'Jesús'}

const passenger2:Passenger = {
    name: 'Pipo',
    children: ['pipo jr', 'pipo jr2']}

const printChildrenNumber = (passenger:Passenger) => {

    if (!passenger.children) return 0;

    // const howManyChildren = passenger.children?.length || 0;
    const howManyChildren = passenger.children!.length;
    
    console.log(passenger.name, howManyChildren);
}

printChildrenNumber(passenger1);
printChildrenNumber(passenger2);