export const employeeValidationRules = {
	name: {
		required: 'Поле обязательно к заполнению!',
		minLength: {
			value: 2,
			message: 'Минимум 2 буквы'
		},
		pattern: {
			value: /^[А-Яа-яЁё\s]+$/,
			message: 'Только русские буквы!'
		}
	},
	phone: {
		required: 'Поле обязательно к заполнению!',
		message: 'Неверный формат телефона',
	},
	birthday: {
		required: 'Поле обязательно к заполнению!',
		pattern: {
			value: /^(0[1-9]|[12][0-9]|3[01])\.(0[1-9]|1[0-2])\.(19|20)\d\d$/,
			message: 'Введите корректную дату',
		}
	},
	role: {
		required: 'Поле обязательно к заполнению!',
	},
};