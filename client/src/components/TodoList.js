import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toggle, destroy, selectFiltered, getTodoAsync } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';

const TodoList = () => {
	const dispatch = useDispatch();

	const items = useSelector(selectFiltered);
	const loading = useSelector((state) => state.todos.isLoading);
	const error = useSelector((state) => state.todos.error);

	console.log(items);

	const handleDestroy = (id) => {
		if (window.confirm('Are you sure?')) {
			dispatch(destroy(id));
		}
	};

	useEffect(() => {
		dispatch(getTodoAsync());
	}, [dispatch]);

	if (loading) return <div className='new-todo'>Loading...</div>;
	if (error) return <div className='new-todo'>Error : {error}</div>;

	return (
		<ul className='todo-list'>
			{items.map((item) => (
				<li
					key={item.id}
					className={item.completed ? 'completed' : ''}>
					<div className='view'>
						<input
							className='toggle'
							type='checkbox'
							checked={item.completed}
							onChange={() => dispatch(toggle({ id: item.id }))}
						/>
						<label>{item.title}</label>
						<button
							className='destroy'
							onClick={() => handleDestroy(item.id)}></button>
					</div>
				</li>
			))}
		</ul>
	);
};

export default TodoList;
