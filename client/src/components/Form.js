import React, { useState } from 'react';
import { addTodo } from '../redux/todos/todosSlice';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';




const Form = () => {
	const [ title, setTitle ] = useState('');

	const dispatch = useDispatch();

	const handleSubmit = (e) => {
		if (!title) return;
		e.preventDefault();
		dispatch(addTodo({ title: title}));
		setTitle('')
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className='new-todo'
				placeholder='What needs to be done?'
				autoFocus
				value={title}
				onChange={(e)=>setTitle(e.target.value)}
			/>
		</form>
	);
};

export default Form;
