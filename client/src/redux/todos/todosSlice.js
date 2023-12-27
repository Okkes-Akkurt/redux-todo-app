import { createSlice} from '@reduxjs/toolkit';
import { addTodoAsync, getTodoAsync, removeItemAsync, toggleTodoAsync } from './services';


export const todosSlice = createSlice({
	name: 'todos',
	initialState: {
		items: [],
		activeFilter: 'all',
		isLoading: false,
		error: null,
	},

	reducers: {

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
			//get todos
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
			})

			//addTodo
			.addCase(addTodoAsync.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(addTodoAsync.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.isLoading = false;
			})
			.addCase(addTodoAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})

			//ToggletodoAsync
			.addCase(toggleTodoAsync.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(toggleTodoAsync.fulfilled, (state, action) => {
				const index = state.items.findIndex((item) => item.id === action.payload.id);
				state.items[index].completed = action.payload.completed;
				state.isLoading = false;
			})
			.addCase(toggleTodoAsync.rejected, (state, action) => {
				state.isLoading = false;
				state.error = action.error.message;
			})

			//removeItemAsync
			.addCase(removeItemAsync.pending, (state, action) => {
				state.isLoading = true;
			})
			.addCase(removeItemAsync.fulfilled, (state, action) => {
				state.items = action.payload;
				state.isLoading = false;
			})
			.addCase(removeItemAsync.rejected, (state, action) => {
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

export const { changeActiveFilter, clearCompleted } = todosSlice.actions;
