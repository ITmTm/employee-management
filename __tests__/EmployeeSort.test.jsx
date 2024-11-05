import { render, screen, fireEvent, waitFor } from  '@testing-library/react';
import { expect, describe, it, beforeEach } from 'vitest';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import employeeReducer from '../src/redux/employeeSlice.js';
import EmployeeSort from "../src/components/employeeSort/EmployeeSort.jsx";

const renderWithProviders = (ui, { store }) => {
	return render(
		<Provider store={store}>
			{ui}
		</Provider>
	);
};

describe('EmployeeSort Component', () => {
	let store;

	beforeEach(() => {
		store = configureStore({
			reducer: { employees: employeeReducer },
			preloadedState: {
				employees: {
					sort: { by: 'name', direction: 'asc' },
					list: [],
				},
			},
		});
	});

	it('renders sort options correctly', () => {
		renderWithProviders(<EmployeeSort />, { store });

		expect(screen.getByText('Сортировать по:')).toBeInTheDocument();
		expect(screen.getByText('Имя')).toBeInTheDocument();
		expect(screen.getByText('Дата рождения')).toBeInTheDocument();
	});

	it('changes sort field when selected', async () => {
		renderWithProviders(<EmployeeSort />, { store });

		const selectElement = screen.getByLabelText('Сортировать по:');
		fireEvent.change(selectElement, { target: { value: 'birthday' } });

		await waitFor(() => {
			expect(selectElement.value).toBe('birthday');
		});
	});

	it('toggles sort direction on button click', async () => {
		renderWithProviders(<EmployeeSort />, { store });

		const toggleButton = screen.getByRole('button', { name: 'По возрастанию' });
		fireEvent.click(toggleButton);

		await waitFor(() => {
			expect(toggleButton).toHaveTextContent('по убыванию');
		});
	});
})