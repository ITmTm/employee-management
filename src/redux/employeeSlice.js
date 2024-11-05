import { createSlice } from "@reduxjs/toolkit";
import { loadEmployees, saveEmployees, generateId } from "../utils/storageUtils.js";
import { sortEmployees } from "../utils/sortUtils.js";


export const selectSort = (state) => state.employees.sort;

const initialEmployees = loadEmployees()
saveEmployees(initialEmployees);

const initialSortState = {
	by: localStorage.getItem('sortBy') || 'name',
	direction: localStorage.getItem('sortDirection') || 'asc',
};


const employeeSlice = createSlice({
	name: 'employees',
	initialState: {
		list: sortEmployees(initialEmployees, initialSortState.by, initialSortState.direction),
		filter: { role: '', isArchive: false },
		sort: initialSortState,
	},
	reducers: {
		setFilter(state, action) {
			state.filter = action.payload;
		},
		setSort(state, action) {
			state.sort = action.payload;
			state.list = sortEmployees(state.list, state.sort.by, state.sort.direction);

			// Сохраняем параметры сортировки в localStorage
			localStorage.setItem('sortBy', state.sort.by);
			localStorage.setItem('sortDirection', state.sort.direction);

			// Сохраняем отсортированный список в localStorage
			saveEmployees(state.list);
		},
		addEmployee(state, action) {
			const newEmployee = { ...action.payload, id: generateId(state.list) };
			state.list.push(newEmployee);

			// Сортируем список после добавления нового сотрудника
			state.list = sortEmployees(state.list, state.sort.by, state.sort.direction);

			saveEmployees(state.list);		// Сохраняем обновленный список в localStorage
		},
		updateEmployee(state, action) {
			const index = state.list.findIndex(emp => emp.id === action.payload.id);
			if (index !== -1) {
				state.list[index] = action.payload;

				// Сортируем список после обновления сотрудника
				state.list = sortEmployees(state.list, state.sort.by, state.sort.direction);
				saveEmployees(state.list);  // Сохраняем обновленный список в localStorage
			}
		},
		resetSort(state) {
			state.sort = { by: 'name', direction: 'asc' };
			localStorage.removeItem('sortBy');
			localStorage.removeItem('sortDirection');
		},
	},
});


export const { setFilter, setSort, addEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;