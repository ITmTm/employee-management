import {useDispatch, useSelector} from "react-redux";
import { setSort, selectSort } from "../../redux/employeeSlice.js";

import './employeeSort.scss';

const EmployeeSort = () => {
	const dispatch = useDispatch() ;
	const sort = useSelector(selectSort) || { by: 'name', direction: 'asc' };

	const handleSortChange = (e) => {
		dispatch(setSort({ ...sort, by: e.target.value }));
	};

	const toggleSortDirection = () => {
		const newDirection = sort.direction === 'asc' ? 'desc' : 'asc';
		dispatch(setSort({ ...sort, direction: newDirection }));
	};

	return (
		<div className='employee-sort'>
			<label>
				Сортировать по:
				<select value={sort.by} onChange={handleSortChange}>
					<option value="name">Имя</option>
					<option value="birthday">Дата рождения</option>
				</select>
			</label>
			<button onClick={toggleSortDirection}>
				{sort.direction === 'asc' ? 'По возрастанию' : 'по убыванию'}
			</button>
		</div>
	);
};

export default EmployeeSort;