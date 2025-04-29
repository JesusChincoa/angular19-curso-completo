
export function whatsMyType<T>(argument:T) :T{ //T es un tipo generico
    
    return argument;
}

const amIString = whatsMyType<string>('Hello World');
const amINumber = whatsMyType<number>(33);
const amIArray = whatsMyType<number[]>([1,2,3,4,5]);

console.log(amIString.split(' '));
console.log(amINumber.toFixed());
console.log(amIArray.join('-'));