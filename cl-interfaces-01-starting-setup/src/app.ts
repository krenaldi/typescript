// interface as function type
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
    return n1 + n2;
}

interface Named {
    readonly name?: string;
    outputName?: string; // optional property
}

interface Greetable extends Named {
    greet(phrase: string): void;
}


class Person implements Greetable {
    name?: string;
    age = 45;
    // set parameter as optional since name is optional in both class and Named interface
    constructor(n?: string) {
        // if there is a parameter for name set it to the parameter value
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        // if there is a name set, console.log phrase 
        if (this.name) {
            console.log(phrase + ' ' + this.name);
        } else {
            console.log('Hi!');
        }
    }
}

let user1: Greetable;

user1 = new Person('Kris');

user1.greet('Hi there - I am');
console.log(user1);