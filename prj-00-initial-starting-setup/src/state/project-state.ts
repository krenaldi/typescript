import { Project, ProjectStatus } from '../models/project';

// Project State Management
/*  Don't need to export Listener type or class State since both are actually called in ProjectState  */
type Listener<T> = (items: T[]) => void;

class State<T> {
    protected listeners: Listener<T>[] = [];

    // Listener functions will watch for any changes to the ProjectState
    addListener(listenerFn: Listener<T>) {
        this.listeners.push(listenerFn);
    }
}

export class ProjectState extends State<Project>{
    private projects: Project[] = [];
    private static instance: ProjectState;

    private constructor() {
        super();
    }

    static getInstance() {
        if (this.instance) {
            return this.instance;
        }
        this.instance = new ProjectState();
        return this.instance;
    }

    // method to create a project
    addProject(title: string, description: string, numOfPeople: number) {
        const newProject = new Project(
            Math.random().toString(),
            title,
            description,
            numOfPeople,
            ProjectStatus.Active
        );
        this.projects.push(newProject);
        this.updateListeners();
    }

    // method that moves project from one area to another
    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(proj => proj.id === projectId);
        // check if project exists and that it's not already newStatus to prevent re-rendering
        if (project && project.status !== newStatus) {
            project.status = newStatus;
            this.updateListeners();
        }
    }

    private updateListeners() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}

// Global state that can be used anywhere in file
export const projectState = ProjectState.getInstance();
