import React from 'react';

import './TodoList.css';

// Interface to show how props is to be setup & can be passes as a type for the Functional Component TodoList
interface TodoListProps {
    items: {id: string, text: string}[];
    onDeleteTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = props => {
    
    return (<ul>
        {props.items.map(todo => (<li key={todo.id}>
            <span>{todo.text}</span>
            <button onClick={props.onDeleteTodo.bind(null, todo.id)}>DELETE</button>
            </li>)
        )}
    </ul>
    );
};

export default TodoList;