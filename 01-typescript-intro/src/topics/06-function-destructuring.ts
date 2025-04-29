
export interface Product {
    description:string;
    price:number;
}

const phone: Product ={
    description: 'Nokia AI',
    price: 150.0,
} 

const tablet:Product = {
    description: 'IPad Air',
    price: 250.0,
}

export interface taxCalculationOptions {
    tax: number,
    products: Product[];
}

export function taxCalculation( options:taxCalculationOptions ): [number,number]{
    const { tax, products } = options;
    let total = 0;
    products.forEach( ({price}) => {
        total += price;
    });

    return [total, total * tax];
}

const shoppingCart =[phone, tablet];
export const tax = 0.15;

const [ total, taxResult, ] = taxCalculation({tax, products:shoppingCart });


console.log('Total:', total);
console.log('Tax:', taxResult);

