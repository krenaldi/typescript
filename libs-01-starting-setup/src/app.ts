import 'reflect-metadata';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Product } from './product-model';

// This works for single instance of 1 product
// const p1 = new Product('Book', 12.99);
// console.log(p1.getInformation());

// For multiple products
const products = [
    {title: 'Carpet', price: 29.99},
    {title: 'Book', price: 10.99}
];


// New product using validator from class-validator package
const newProd = new Product('', -5.99);
validate(newProd).then(err => {
    if (err.length > 0) {
        console.log('VALIDATION ERRORS');
        console.log(err);
    } else {
        console.log(newProd.getInformation());
    }
});

// To run instance of getInformation() w/ plain JS
// const loadedProducts = products.map(prod => {
//     return new Product(prod.title, prod.price);
// });


// To run instance of getInformation() w/ class-transformer
const loadedProducts = plainToClass(Product, products);

// Loop through array of products
for (const prod of loadedProducts) {
    console.log(prod.getInformation());
}