import { render, screen } from '@testing-library/react';
import { expect, describe, it } from 'vitest';

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from '../src/redux/employeeSlice.js'
import EmployeeList from "../src/pages/employeeListPage/EmployeeListPage.jsx";


			// Моковые данные для сотрудников
const mockEmployees = [
	{ id: 1, name: 'Илья Емельянов', isArchive: false, role: 'driver', phone: '+7 (999) 111-1111', birthday: '12.02.1982'},
	{ id: 2, name: 'Александр Ларионов', isArchive: true, role: 'waiter', phone: '+7 (999) 222-2222', birthday: '26.01.1986'},
	{ id: 3, name: 'Богдан Давыдов', isArchive: false, role: 'driver', phone: '+7 (999) 333-3333', birthday: '29.11.1990'},
];

			// Функция для создания store с mock-данными
const renderWithProviders = (ui, { preloadedState } = {}) => {
	const store = configureStore({
		reducer: { employees: employeeReducer },
		preloadedState: {
			employees: {
				list: preloadedState?.employees?.list || [],
				filter: preloadedState?.employees?.filter || { role: '', isArchive: false },
				sort: preloadedState?.employees?.sort || { by: 'name', direction: 'asc' },
			},
			...preloadedState
		},
	});

	return render(
		<Provider store={store}>
			<Router>
				{ui}
			</Router>
		</Provider>
	);
};

describe('EmployeeList', () => {
	it('должен рендерить список сотрудников', () => {
		renderWithProviders(<EmployeeList />, {
			preloadedState: {
				employees: {
					list: mockEmployees,
					filter: { role: '', isArchive: false }
				}
			}
		});

		expect(screen.getByText('Илья Емельянов')).toBeInTheDocument();
		expect(screen.getByText('Александр Ларионов')).toBeInTheDocument();
		expect(screen.getByText('Богдан Давыдов')).toBeInTheDocument();
	});

	it('должен отображать сообщения при отсуствии сотрудников', () => {
		renderWithProviders(<EmployeeList />, { preloadedState: { employees: { list: [], filter: { role: '', isArchive: false } } } });

		expect(screen.getByText('Нет сотрудников для отображения')).toBeInTheDocument();
	});

	it('должен фильтровать сотрудников по роли', () => {
		renderWithProviders(<EmployeeList />, { preloadedState: { employees: { list: mockEmployees, filter: { role: 'driver', isArchive: false } } } });

		expect(screen.getByText('Илья Емельянов')).toBeInTheDocument();
		expect(screen.getByText('Богдан Давыдов')).toBeInTheDocument();
		expect(screen.queryByText('Александр Ларионов')).not.toBeInTheDocument();		// waiter не отображается
	});

	it('должен фильтровать сотрудников по архивному статусу', () => {
		renderWithProviders(<EmployeeList />, { preloadedState: { employees: { list: mockEmployees, filter: { role: '', isArchive: true } } } });
		expect(screen.getByText('Александр Ларионов')).toBeInTheDocument();
		expect(screen.queryByText('Илья Емельянов')).not.toBeInTheDocument(); // Только архивные сотрудники отображаются
		expect(screen.queryByText('Богдан Давыдов')).not.toBeInTheDocument();
	});
});

