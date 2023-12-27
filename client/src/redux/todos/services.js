import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getTodoAsync = createAsyncThunk('todos/getTodoAsync', async () => {
	const res = await fetch('http://localhost:7000/todos');
	return await res.json();
});

export const addTodoAsync = createAsyncThunk('todos/addTodoAsync', async (data) => {
	const res = await axios.post('http://localhost:7000/todos', data);
	return await res.data;
});

export const toggleTodoAsync = createAsyncThunk('todos/toggleTodoAsync', async ({ id, data }) => {
	const res = await axios.patch(`http://localhost:7000/todos/${id}`, data);
	return await res.data;
});

export const removeItemAsync = createAsyncThunk('todos/removeItemAsync', async (id) => {
	const res = await axios.delete(`http://localhost:7000/todos/${id}`);
	return await res.data;
});
