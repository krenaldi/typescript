// Drag & Drop Interfaces//

// applies to ProjectItem which is to be dragged
export interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

//applies to ProjectList which is where the ProjectItem is to be dragged to
export interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}
