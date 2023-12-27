import React, { useState } from 'react';
import { addTodoAsync } from '../redux/todos/services';
import { useDispatch, useSelector } from 'react-redux';

const Form = () => {
	const [title, setTitle] = useState('');

	const dispatch = useDispatch();

	const loading = useSelector(state => state.todos.isLoading);

	const handleSubmit = async (e) => {
		if (!title) return;
		e.preventDefault();
		await dispatch(addTodoAsync({ title: title }));
		setTitle('');
	};

	return (
		<form onSubmit={handleSubmit} style={{display:'flex',alignItems:'center'}}>
			<input
				className='new-todo'
				placeholder='What needs to be done?'
				autoFocus
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>

			<span style={{paddingRight:10}}>{loading && 'Loading..'}</span>
		</form>
	);
};

export default Form;
