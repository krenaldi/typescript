type Admin = {
  name: string;
  privileges: string[];
};

type Employee = {
  name: string;
  startDate: Date;
};

// interface ElevatedEmployee extends Employee, Admin {}

// create type with combined types
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
  name: 'Max',
  privileges: ['create-server'],
  startDate: new Date()
};

// console.log(e1);

// can be use with union types
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// Type Guard w/ typeof check & function overloads to define the type of the result of the function based on different parameter types
function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}
//console.log(add(1, 4));

const result = add('Kris', ' Renaldi');
result.split(' ');
//console.log(result);

// Optional chaining with data received from backend or API call
const fetchedUserData = {
  id: 'u1',
  name: 'Kris',
  job: {
    title: 'CEO',
    description: 'My own company'
  }
};

console.log(fetchedUserData?.job?.title);

// Nullish coalescing for null or undefined values (Doesn't work for empty string)
const dataInput = null;
const storedData = dataInput ?? "DEFAULT";
console.log(storedData);

// Type guard w/ key in check of object
type UnknownEmployee = Employee | Admin;

function printEmployeeInfo(emp: UnknownEmployee) {
  console.log('Name: ' + emp.name);
  if ('privileges' in emp) {
    console.log('Privileges: ' + emp.privileges);
  }
  if ('startDate' in emp) {
    console.log('Start Date: ' + emp.startDate);
  }
}

printEmployeeInfo(e1);
printEmployeeInfo({ name: 'Kris', startDate: new Date() });

// instanceof type guard with classes (Note: Can't be used with interfaces)
class Car {
  drive() {
    console.log('Driving...');
  }
}

class Truck {
  drive() {
    console.log('Driving a truck...');
  }

  loadCargo(amount: number) {
    console.log('Loading cargo ...' + amount);
  }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
  vehicle.drive();
  if (vehicle instanceof Truck) {
    vehicle.loadCargo(1000);
  }
}

useVehicle(v1);
useVehicle(v2);

// Discriminated Unions with literal types in interfaces. The type property must be in every object interface.
interface Bird {
  type: 'bird';
  flyingSpeed: number;
}

interface Horse {
  type: 'horse';
  runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
  // can't use instanceof since objects are created with interfaces
  let speed;
  // can use switch/case since you can have more interfaces so you will need to switch object.type
  switch (animal.type) {
    case 'bird':
      speed = animal.flyingSpeed;
      break;
    case 'horse':
      speed = animal.runningSpeed;
      break;
  }
  console.log('Moving at speed: ' + speed);
}

moveAnimal({ type: 'horse', runningSpeed: 15 });
moveAnimal({ type: 'bird', flyingSpeed: 10 });

// Type casting
// const paragraph = document.getElementById('message-output');
// <HTMLInputElement> is globally available if including the dom lib on tsconfig
// 1st version
const userInput = <HTMLInputElement>document.getElementById('user-input');

// 2nd version -if using React with TS since <HTMLInputElement> is the same as component syntax in jsx files
const userInput2 = document.getElementById('another-input')! as HTMLInputElement;

userInput.value = 'Hi There!';
userInput2.value = 'Goodbye!';

// An option to not use ! after element requires an if check and to wrap element as HTMLInputElement in ()
const userInput3 = document.getElementById('more-input');

if (userInput3) {
  (userInput3 as HTMLInputElement).value = 'Hola!';
}

// Index Properties
// This interface should be flexible with what it holds and to be used with any form or element
interface ErrorContainer { // { email: 'Not a valid email', username: 'Must start with a character'}
  [prop: string]: string;
}

const errorBag: ErrorContainer = {
  email: 'Not a valid email!',
  username: 'Must start with a capital character!'
};