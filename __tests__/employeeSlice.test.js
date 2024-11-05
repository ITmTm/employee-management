/*
	*	Тесты для employeeSlice

1) должен возвращать начальное состояние:
	*	Этот тест проверяет, что начальное состояние employeeSlice корректно инициализируется. Он мокаем localStorage для возврата данных, хранящихся в нем, если они доступны. Проверяется, что фильтры, сортировка и список сотрудников соответствуют ожидаемым значениям, при этом список сотрудников проверяется без учета порядка элементов.

2) должен устанавливать фильтр:
	*	Проверяет, что функция setFilter обновляет состояние employeeSlice с заданными фильтрами (role и isArchive). После применения действия setFilter проверяется, что новое состояние фильтра соответствует ожидаемому значению.

3) должен устанавливать сортировку:
	*	Проверяет, что функция setSort правильно обновляет критерии сортировки (поле by и направление direction). Тест проверяет, что состояние сортировки обновлено до значений by: 'birthday' и direction: 'desc'.

4)должен добавлять нового сотрудника и сортировать список:
	*	Этот тест проверяет, что новый сотрудник добавляется в list, и затем список сортируется по заданному полю (в данном случае по name в алфавитном порядке). Проверяется, что новый сотрудник присутствует в списке, и что весь список отсортирован по name.

5)должен обновлять данные сотрудника:
	*	Проверяет, что функция updateEmployee корректно обновляет данные сотрудника с заданным id. Тест создает состояние, в котором есть сотрудник с id: 1, обновляет его данные и проверяет, что имя изменилось на "Измененный Сотрудник".
*/

/* Тесты для функций localStorage

1) должен загружать сотрудников из localStorage:
	* Проверяет, что функция loadEmployees корректно загружает данные сотрудников из localStorage. Мокируется значение localStorage.getItem для возврата списка сотрудников, и затем проверяется, что загруженные данные соответствуют этому списку.

2) должен сохранять сотрудников в localStorage:
	* Этот тест проверяет, что функция saveEmployees корректно сохраняет список сотрудников в localStorage. Мокается метод setItem и проверяется, что saveEmployees вызывает его с правильными параметрами (ключ и значение JSON).

3) должен возвращать данные по умолчанию при ошибке загрузки из localStorage:
	* Этот тест проверяет, что при ошибке загрузки данных из localStorage (например, когда localStorage.getItem возвращает null), функция loadEmployees загружает данные по умолчанию из файла employees.json.
*/




import { describe, it, expect, beforeEach, vi } from 'vitest';
import employeeReducer, {
	setFilter,
	setSort,
	addEmployee,
	updateEmployee,
} from "../src/redux/employeeSlice.js";

import { loadEmployees, saveEmployees } from '../src/utils/storageUtils.js';
import defaultEmployees from '../employees.json';

// Мокаем localStorage для Vitest
beforeEach(() => {
	vi.stubGlobal('localStorage', {
		getItem: vi.fn(),
		setItem: vi.fn(),
		removeItem: vi.fn(),
		clear: vi.fn()
	});
});

describe('employeeSlice', () => {
	const initialState = {
		list: loadEmployees(),
		filter: {
			role: '',
			isArchive: false
		},
		sort: {
			by: 'name',
			direction: 'asc'
		},
	};

	it('должен возвращать начальное состояние', () => {
		// Мокаем ответ `getItem` для возвращения корректного начального списка сотрудников
		vi.spyOn(globalThis.localStorage, 'getItem').mockImplementation((key) => {
			if (key === 'employees') {
				return JSON.stringify(initialState.list);
			}
			if (key === 'sortBy') {
				return 'name';
			}
			if (key === 'sortDirection') {
				return 'asc';
			}
			return null;
		});

		const result = employeeReducer(undefined, {});

		// Проверяем, что фильтр и сортировка соответствуют ожиданиям
		expect(result.filter).toEqual(initialState.filter);
		expect(result.sort).toEqual(initialState.sort);

		// Проверка наличия списка сотрудников, но без учета порядка
		expect(result.list).toHaveLength(initialState.list.length);
		expect(new Set(result.list.map(emp => emp.id))).toEqual(new Set(initialState.list.map(emp => emp.id)));
	});

	it('должен устанавливать фильтр', () => {
		const action = setFilter({
			role: 'cook',
			isArchive: true
		});

		const result = employeeReducer(initialState, action);
		expect(result.filter).toEqual({
			role: 'cook',
			isArchive: true
		});
	});

	it('должен устанавливать сортировку', () => {
		const action = setSort({
			by: 'birthday',
			direction: 'desc'
		});

		const result = employeeReducer(initialState, action);
		expect(result.sort).toEqual({
			by: 'birthday',
			direction: 'desc'
		});
	});

	it('должен добавлять нового сотрудника и сортировать список', () => {
		const newEmployee = {
			name: 'Новый Сотрудник',
			isArchive: false,
			role: 'waiter',
			phone: '+7 (999) 999-9999',
			birthday: '01.01.1990'
		};

		const action = addEmployee(newEmployee);
		const result = employeeReducer(initialState, action);

		expect(result.list).toHaveLength(initialState.list.length + 1);
		const addedEmployee = result.list.find(emp => emp.name === 'Новый Сотрудник');
		expect(addedEmployee).toBeTruthy();

		// Проверяем, что список отсортирован после добавления
		const sortedList = result.list.slice().sort((a, b) => a.name.localeCompare(b.name));
		expect(result.list).toEqual(sortedList);
	});

	it('должен обновлять данные сотрудника', () => {
		const updatedEmployee = {
			id: 1,
			name: 'Измененный Сотрудник',
			role: 'driver',
			isArchive: false,
			phone: '+7 (999) 999-9999',
			birthday: '12.02.1982'
		};

		const action = updateEmployee(updatedEmployee);
		const stateWithEmployee = {
			...initialState,
			list: [...initialState.list, updatedEmployee],
		};

		const result = employeeReducer(stateWithEmployee, action);

		expect(result.list.find(emp => emp.id === 1).name).toBe('Измененный Сотрудник');
	});
});

															// Тесты для localStorage функций
describe('localStorage функции', () => {
	it('должен загружать сотрудников из localStorage', () => {
		const mockEmployees = [{
			id: 1,
			name: 'Тестовый Сотрудник',
			isArchive: false,
			role: 'waiter',
			phone: '+7 (999) 999-9999',
			birthday: '01.01.1990'
		}];

		vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValueOnce(JSON.stringify(mockEmployees));
		const employees = loadEmployees();
		expect(employees).toEqual(mockEmployees);
	});

	it('должен сохранять сотрудников в localStorage', () => {
		const mockEmployees = [{ id: 1, name: 'Тестовый Сотрудник', isArchive: false, role: 'waiter', phone: '+7 (999) 999-9999', birthday: '01.01.1990' }];
		saveEmployees(mockEmployees);
		expect(globalThis.localStorage.setItem).toHaveBeenCalledWith('employees', JSON.stringify(mockEmployees));
	});

	it('должен возвращать данные по умолчанию при ошибке загрузки из localStorage', () => {
		vi.spyOn(globalThis.localStorage, 'getItem').mockReturnValueOnce(null);
		const employees = loadEmployees();
		expect(employees).toEqual(defaultEmployees);
	});
});
