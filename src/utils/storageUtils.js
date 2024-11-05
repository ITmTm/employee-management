import defaultEmployees from '../../employees.json';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const loadEmployees = () => {
	const data = localStorage.getItem('employees');

	if (!data) {
		saveEmployees(defaultEmployees);	// Сохранение данных по умолчанию, если данных нет
		return defaultEmployees;
	}

	try {
		const parsedData = JSON.parse(data);

		// Проверка на корректность структуры данных
		if (Array.isArray(parsedData) && parsedData.every(isValidEmployee)) {
			return parsedData;
		} else {
			toast.error('Data structure in localStorage is invalid. Loading default employees');
			saveEmployees(defaultEmployees); 	// Сохраняем корректные данные
			return defaultEmployees;
		}
	} catch (error) {
		toast.error('Failed to load employees from localStorage. Loading default employees.');
		console.error('Error loading employees:', error);
		saveEmployees(defaultEmployees); 		// Сохраняем корректные данные
		return defaultEmployees;
	}
};

export const saveEmployees = (employees) => {
	if (Array.isArray(employees) && employees.every(isValidEmployee)) {
		localStorage.setItem('employees', JSON.stringify(employees))
	} else {
		console.warn('Attempted to save invalid data structure to localStorage. Skipping save.');
	}
};

export const isValidEmployee = (employee) => {
	const requiredFields = {
		id:'number',
		name: 'string',
		isArchive: 'boolean',
		role: 'string',
		phone: 'string',
		birthday: 'string'
	};

	return Object.entries(requiredFields).every(([key, type]) =>
		typeof employee[key] === type
	);
};


export const generateId = (list) => list.reduce((max, employee) => Math.max(max, employee.id), 0) + 1;