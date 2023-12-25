import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';

export const getTodoAsync = createAsyncThunk('todos/getTodoAsync', async () => {
	const res = await fetch('http://localhost:7000/todos');
	return await res.json();
});

export const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		activeFilter: 'all',
		isLoading: false,
		error: null,
	},

	reducers: {
		addTodo: {
			reducer: (state, action) => {
				state.items.push(action.payload);
			},
			prepare: ({ title }) => {
				return {
					payload: {
						id: nanoid(),
						completed: false,
						title,
					},
				};
			},
		},
		toggle: (state, action) => {
			const { id } = action.payload;
			const item = state.items.find((item) => item.id === id);
			item.completed = !item.completed;
		},
		destroy: (state, action) => {
			const id = action.payload;
			const filtered = state.items.filter((item) => item.id !== id);
			state.items = filtered;
		},
		changeActiveFilter: (state, action) => {
			state.activeFilter = action.payload;
		},
		clearCompleted: (state) => {
			const filtered = state.items.filter((item) => item.completed === false);
			state.items = filtered;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(getTodoAsync.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(getTodoAsync.fulfilled, (state, action) => {
				state.items = action.payload;
				state.isLoading = false;
			})
			.addCase(getTodoAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			});
	},
});

export const selectTodos = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.activeFilter;
export const selectFiltered = (state) => {
	if (state.todos.activeFilter === 'all') {
		return state.todos.items;
	}
	return state.todos.items.filter((todo) =>
		state.todos.activeFilter === 'active' ? todo.completed === false : todo.completed === true,
	);
};

export default todosSlice.reducer;

export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } = todosSlice.actions;
