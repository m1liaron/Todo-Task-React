import { useState } from "react";

export default function Item({ title, id, status }) {
    const [cheked, setCheked] = useState(status);
    const classes = ['todo'];
    
    if (cheked) {
        classes.push('status');
    }

    const updateStatus = () => {
        setCheked(!cheked);
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        storedTodos.map((el) => {
            if (el.id === id) {
                el.status = !cheked;
            }
            return true;
        });
        localStorage.setItem('tasks', JSON.stringify(storedTodos));
    }

    const [visible, setVisible] = useState(true);

    const removeElement = () => {
        setVisible(prev => !prev)
        const storedTodos = JSON.parse(localStorage.getItem('tasks'));
        let removeTodos = storedTodos.filter(item => {
            if (item.id !== id) {
                return true;
            }
            return false;
        });
        localStorage.setItem('tasks', JSON.stringify(removeTodos));
    }

    return (
        <>
            {visible && (
                <li className={classes.join(' ')}>
                    <label>
                        <input
                            type="checkbox"
                            checked={cheked}
                            onChange={updateStatus}
                        />
                        <span>{title}</span>
                        <i className="material-iconcs red-text"
                        onClick={removeElement}
                        >
                            X
                        </i>
                    </label>
                </li>
            )}
        </>
    )
}