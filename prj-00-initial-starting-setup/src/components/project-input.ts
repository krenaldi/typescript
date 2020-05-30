import { Component } from './base-component';
import { Validatable, validate } from '../util/validation';
import { Autobind } from '../decorators/autobind';
import { projectState } from '../state/project-state';

// ProjectInput Class
export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement>{
    titleInputEl: HTMLInputElement;
    descInputEl: HTMLInputElement;
    peopleInputEl: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');
        // get access to input values
        this.titleInputEl = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputEl = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputEl = this.element.querySelector('#people') as HTMLInputElement;
        this.configure();
    }

    // add event listener
    configure() {
        this.element.addEventListener('submit', this.submitHandler);
    }

    // empty renderContent() to satisfy base class
    renderContent() { }

    private gatherUserInput(): [string, string, number] | void {
        const enteredTitle = this.titleInputEl.value;
        const enteredDescription = this.descInputEl.value;
        const enteredPeople = this.peopleInputEl.value;

        // Validatable objects with Validatable interface
        const titleValidatable: Validatable = {
            value: enteredTitle,
            required: true
        };
        const descValidatable: Validatable = {
            value: enteredDescription,
            required: true,
            minLength: 5
        };
        const peopleValidatable: Validatable = {
            value: +enteredPeople,
            required: true,
            min: 1,
            max: 5
        };

        // if validate function returns false for any validatable objects, create alert
        if (
            !validate(titleValidatable) ||
            !validate(descValidatable) ||
            !validate(peopleValidatable)
        ) {
            alert('Invalid input!');
            return;
        } else {
            return [enteredTitle, enteredDescription, +enteredPeople];
        }
    }

    private clearInputs() {
        this.titleInputEl.value = '';
        this.descInputEl.value = '';
        this.peopleInputEl.value = '';
    }

    @Autobind
    private submitHandler(event: Event) {
        event.preventDefault();
        // console.log(this.titleInputEl.value);
        const userInput = this.gatherUserInput();
        // check if userInput is a tuple (actually an array in JS)
        if (Array.isArray(userInput)) {
            const [title, desc, people] = userInput;
            projectState.addProject(title, desc, people);
            this.clearInputs();
        }
    }
}