// Simple Decorator
// function Logger(constructor: Function) {
//   console.log('Logging...');
//   // discplay class function decorator is applied to
//   console.log(constructor);
// }

// Decorator factory
function Logger(logString: string) {
  return function (constructor: Function) {
    console.log(logString);
    // discplay class function decorator is applied to
    console.log(constructor);
  };
}

// Create a template to a hookId and apply to class
function WithTemplate(template: string, hookId: string) {
  // return generic function that creates new class that accepts all args in the constructor of the defined class and return an object with the property of the class
  return function<T extends { new (...args: any[]): {name: string} } >(originalConstructor: T) {
    // create class w/ new constructor that can execute original logic w/ this new logic
    return class extends originalConstructor {
      // generate a new constructor that will have all args from original constructor w/ ..._:any[]
      constructor(..._: any[]) {
        super();
        console.log('Rendering template...')
        const hookEl = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookEl) {
          // add html template from the decorator 1st argument to the div
          hookEl.innerHTML = template;
          // change the text in the h1 element and replace with name property in the class
          hookEl.querySelector('h1')!.textContent = this.name;
        }
      }
    };
  };
}

// Applies decorator to Person class
@Logger('LOGGING - PERSON')
@WithTemplate('<h1>My Person Object</h1>', 'app')
class Person {
  name = 'Max';

  constructor() {
    console.log('Creating person object...');
  }
}

// const pers = new Person();

// console.log(pers);

// Property decorator
function Log(target: any, propertyName: string | Symbol) {
  console.log('Property decorator!');
  console.log(target, propertyName); // returns prototype of class (coonstructor, setter, method) for target and "title" for propertyName
}

// Accessor decorator for setters & getters
function Log2(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Accessor decorator!');
  console.log(target); // returns prototype
  console.log(name); // returns price for name of accessor
  console.log(descriptor); // returns the descriptor with setter function & configurable: true, enumerable: false - would return getter function if applied to getter but this case is set to undefined
}

// Method decorator
function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('Method decorator!');
  console.log(target); // returns prototype
  console.log(name); // returns getPriceWithTax for name of method
  console.log(descriptor); // returns the descriptor of the method function 
}

// Parameter decorator
function Log4(target: any, name: string | Symbol, position: number) {
  console.log('Parameter decorator!');
  console.log(target); // returns prototype
  console.log(name); // returns getPriceWithTax for name of method
  console.log(position); // returns 0 since argument is the 1st position argument 
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val;
    } else {
      throw new Error('Invalid price!');
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }
  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}

const p1 = new Product('Book', 19);
const p2 = new Product('Book 2', 29);


// Decorator to bind this keyword to the object the method belongs to
function Autobind(_: any, _2: string | Symbol, descriptor: PropertyDescriptor) {
  // get the original method from the value of the descriptor
  const originalMethod = descriptor.value;
  // create an adjusted descriptor w/ new descriptor properties
  const adjustedDesc: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    // extra logic when users access this property
    get() {
      // boundFn will bind this inside the original method and also the same object
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjustedDesc;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log(this.message);
  }
}

const p = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', p.showMessage);


// Decorators for validation

interface ValidatorConfig {
  [property: string]: {
    [validatableProp: string]: string[] // ['required', 'positive']
  }
}

const registeredValidators: ValidatorConfig = {};

// Property decorator for title
function Required(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // add any existing registeredValidators constructors to each decorator
    ...registeredValidators[target.constructor.name],
    [propName]: ['required']
  };
}

// Property decorator for price
function PositiveNumber(target: any, propName: string) {
  registeredValidators[target.constructor.name] = {
    // add any existing registeredValidators constructors to each decorator
    ...registeredValidators[target.constructor.name],
    [propName]: ['positive']
  };
}

function validate(obj: any) {
  // get the name from each of the registeredValidators (should be the propName 'required' & 'positive')
  const objValidatorConfig = registeredValidators[obj.constructor.name];
  // if there is no objValidatorConfig then return true
  if (!objValidatorConfig) {
    return true;
  }
  // variable set to true and update in switch cases to make sure each validator is true and if false to break
  let isValid = true;
  // if objValidatorConfig is present loop thru the inner object [propName] of registeredValidators
  for (const prop in objValidatorConfig) {
    // loop thru the props of each of the validators
    console.log(prop);
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'required':
          // if true use !! in ts
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          // return true if property is greater than 0
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl.value;
  const price = +priceEl.value;

  const createdCourse = new Course(title, price);
  if (!validate(createdCourse)) {
    alert('Invalid input!');
    return;
  }
  console.log(createdCourse);
});
