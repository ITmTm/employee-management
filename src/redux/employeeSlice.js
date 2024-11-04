import { createSlice } from "@reduxjs/toolkit";
import employeesData from '../../employees.json';

function parseDate(dateString) {
    const [day, month, year] = dateString.split('.');
    return new Date(`${year}-${month}-${day}`)
}

const employeeSlice = createSlice({
    name: 'employees',
    initialState: {
        list: employeesData,
        filter: { role: '', isArchive: false },
        sort: { by: 'name', direction: 'asc' },
    },
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
        },
        setSort(state, action) {
            state.sort = action.payload;
            /** @type {Array<{birthday?: string, name: string}>} */
            state.list = [...state.list].sort((a, b) => {
                const direction = state.sort.direction === 'asc' ? 1 : -1;

                if (state.sort.by === 'name') {
                    return a.name.localeCompare(b.name) * direction;
                }

                if (state.sort.by === 'birthday') {
                    const dateA = a.birthday ? parseDate(a.birthday) : new Date(0);
                    const dateB = b.birthday ? parseDate(b.birthday) : new Date(0);

                    return direction * (dateA.getTime() - dateB.getTime());
                }
                return 0;
            })
        },
        addEmployee(state, action) {
            state.list.push(action.payload);
        },
        updateEmployee(state, action) {
            const index = state.list.findIndex(emp => emp.id === action.payload.id);
            if (index !== -1) {
                state.list[index] = action.payload;
            }
        },
    },
});


export const { setFilter, setSort, addEmployee, updateEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;