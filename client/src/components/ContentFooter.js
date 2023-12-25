import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeActiveFilter, clearCompleted, selectFilter, selectTodos } from '../redux/todos/todosSlice';

const ContentFooter = () => {
	const items = useSelector(selectTodos);
	const activeFilter = useSelector(selectFilter);
	const leftItems = items.filter((item) => !item.completed).length;

	const dispatch = useDispatch();


	return (
		<footer className='footer'>
			<span className='todo-count'>
				<strong>{leftItems} </strong>
				{leftItems > 1 ? 'items left' : 'item left'}
			</span>

			<ul className='filters'>
				<li>
					<a
						href='#/'
						className={activeFilter === 'all' ? 'selected' : ''}
						onClick={() => dispatch(changeActiveFilter('all'))}>
						All
					</a>
				</li>
				<li>
					<a
						href='#/'
						className={activeFilter === 'active' ? 'selected' : ''}
						onClick={() => dispatch(changeActiveFilter('active'))}>
						Active
					</a>
				</li>
				<li>
					<a
						href='#/'
						className={activeFilter === 'completed' ? 'selected' : ''}
						onClick={() => dispatch(changeActiveFilter('completed'))}>
						Completed
					</a>
				</li>
			</ul>

			<button className='clear-completed' onClick={()=>dispatch(clearCompleted())}>Clear completed</button>
		</footer>
	);
};

export default ContentFooter;
