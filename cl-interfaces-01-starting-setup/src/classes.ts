abstract class Department { // abstract added since has abstract method in it
    static fiscalYear = 2020; // static property
    // private readonly id: string; // readonly prevents property from being changed after initialization
    // public name: string;
    protected employees: string[] = []; // use protected to keep prop from being accessed outside of class & but accessed within extended class

    constructor(protected readonly id: string, public name: string) { // shorthand initialization for class
        // this.id = id;
        // this.name = name;
    }

    // example of static method to be called directly on class
    static createEmployee(name: string) {
        return { name: name};
    }

    // method that's to be overridden by extended classes using abstraction
    abstract describe(this: Department): void;
    
    // describe(this: Department) {
    //     console.log(`Department (${this.id}): ${this.name}`);
    // }

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log(this.employees.length);
        console.log(this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
        this.admins = admins;
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }
}

class Accounting extends Department {
    private lastReport: string;
    // need static instance property to store an instance of the Accounting class inside the class
    private static instance: Accounting; 

    // add more logic to property using get method
    get mostRecentReport(){
        if (this.lastReport) {
            return this.lastReport;
        }
        throw new Error('No report found');
    }

    // set method adds more logic like get method but requires a 'value' parameter
    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please add valid value!');
        }
        this.addReport(value);
    }
    // private constructor to initiate only one instance of the Accounting class
    private constructor(id: string, private reports: string[]){
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    // required static method to get instance stored inside of class
    static getInstance() {
        if (Accounting.instance) {
            return this.instance;
        }
        this.instance = new Accounting('d2', []);
        return this.instance;
    }

    describe() {
        console.log('Accounting Department - ID: ' + this.id);
    }

    addEmployee(name: string) {
        if (name === 'Max') {
            return;
        }
        this.employees.push(name);
    }

    addReport(text: string){
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}
// call static method directly on Department class
const employee1 = Department.createEmployee('Carolina');
console.log(employee1, Department.fiscalYear);


// const accounting = new Accounting ('d1', []);

const it_dept = new ITDepartment('it1', ['Kris']);

// call instance of class with private constructor
const accounting = Accounting.getInstance();

//console.log(accounting);
it_dept.addEmployee('Kris');
accounting.addEmployee('Max');
accounting.addEmployee('Manu');

accounting.describe();
it_dept.describe();
// accounting.printEmployeeInformation();

accounting.mostRecentReport = 'Year End Report'; // calling set method
accounting.addReport('Something went wrong');
accounting.addReport('Ooops... Typo.');
console.log(accounting.mostRecentReport); // calling get method
accounting.printReports();

console.log(it_dept);
console.log(accounting);

// const accountingCopy = { name: 'Tax', describe: accounting.describe };

// accountingCopy.describe();