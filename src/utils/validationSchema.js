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
		message: 'Введите дату в формате дд.мм.гггг',
	},
	role: {
		required: 'Поле обязательно к заполнению!',
	},
};