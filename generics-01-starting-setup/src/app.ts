// const names: Array<string> = []; // string[] and can run string methods against it
// names[0].split(' ');

// Promise is another generic type where define the type argument of what is to be returned
// const promise: Promise<string> = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         resolve('This is done');
//     }, 2000)
// });

// promise.then(data => {
//     data.split(' ');
// })

// Custom built generic function. With multiple arguments seperate in <> with a comma in alphabetical order
function merge<T extends object, U extends object>(objA: T, objB: U) { // T & U are telling TS that a type is to be returned for each argument
    return Object.assign(objA, objB);
}

// const mergedObj = merge({name: 'Kris', hobbies: ['scuba']}, 45); // won't work since 2nd argument is not an object
const mergedObj2 = merge({name: 'Max', hobbies: ['Sports']}, {age: 45});
// console.log(mergedObj); // returns only name as string since 2nd argument is not an object
console.log(mergedObj2);

// Another generic function
interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'Got no value';
    if (element.length === 1) {
        description = 'Have 1 element'
    }
    if (element.length > 1) {
        description = 'Have ' + element.length + ' elements'
    }
    return [element, description];
}

console.log(countAndDescribe('Hi there')); // returns Have 8 elements since argument is a string
console.log(countAndDescribe(['scuba', 'cooking'])); // returns Have 2 elements since argument is an array w/ 2 elements

// Generic function with keyof constraint where key will be property of first type T
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Kris'}, 'name'));

// Generic class to store data with only strings, numbers, or boolean types since this class won't work with objects
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Kris');
textStorage.addItem('Max');
console.log(textStorage.getItems());
textStorage.removeItem('Kris');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// Won't work since objects are referrential types
// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Kris'});
// objStorage.addItem({name: 'Max'});
// console.log(objStorage.getItems());

// objStorage.removeItem({name: 'Kris'});
// console.log(objStorage.getItems());

// built-in generic types for utility 
// Partial turns the property types of an interface into optional properties
interface CourseGoal {
    title: string;
    description: string;
    completeUnitl: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUnitl = date;
    // need to return with type casting of the Partial<object> as the interface
    return courseGoal as CourseGoal;
}

// Readonly type for arrays or objects to prevent changing the data
const names: Readonly<string[]> = ['Kris', 'Carolina'];
// The following methods won't work
// names.push('Max');
// names.pop();