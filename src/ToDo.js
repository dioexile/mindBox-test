function ToDo({ todo, toggleTask, removeTask }) {
    return (
        <div key={todo.id} className="item-todo">
            <input type="checkbox" checked={todo.complete} onClick={() => toggleTask(todo.id)} className='check'/>
            <div 
                className={todo.complete ? "item-text strike" : "item-text"}
            >
                {todo.task}
            </div>
            <div className="item-delete" onClick={() => removeTask(todo.id)}>
                X
            </div>
        </div>
    )
}

export default ToDo