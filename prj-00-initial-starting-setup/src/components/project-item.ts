import { Draggable } from '../models/drag-drop-interfaces';
import { Component } from './base-component';
import { Project } from '../models/project';
import { Autobind } from '../decorators/autobind';

// Project Item Class
export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project;

    // getter to display text based on number of people assigned
    get persons() {
        if (this.project.people === 1) {
            return '1 person';
        } else {
            return `${this.project.people} people`;
        }
    }

    constructor(hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @Autobind
    dragStartHandler(event: DragEvent) {
        // console.log(event);
        // attach project id to drag event
        event.dataTransfer!.setData('text/plain', this.project.id);
        // tell browser that data is being moved and updates cursor
        event.dataTransfer!.effectAllowed = 'move';
    }

    dragEndHandler(_: DragEvent) {
        console.log('DragEnd');
    }

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.persons + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}