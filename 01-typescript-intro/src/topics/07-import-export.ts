import { Product, taxCalculation} from './06-function-destructuring'




const shoppingCart: Product[] = [
    { description: 'Nokia', price: 100 },
    { description: 'IPad', price: 150 },
];

const [total, totalTax] = taxCalculation( {tax:0.15,products:shoppingCart} );

console.log(total, totalTax);