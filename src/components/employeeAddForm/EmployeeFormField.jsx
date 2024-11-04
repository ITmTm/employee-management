import PropTypes from "prop-types";

import { Controller } from "react-hook-form";

import InputMask from 'react-input-mask';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

import { employeeValidationRules } from "../../utils/validationSchema.js";

const EmployeeFormField = ({ control, errors, isEditMode, isValid }) => (
	<>
		<Controller
			name='name'
			control={control}
			rules={employeeValidationRules.name}
			render={({ field }) => (
				<TextField
					{...field}
					label='Имя, Фамилия'
					variant='outlined'
					fullWidth
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
			)}
		/>

		<Controller
			name='phone'
			control={control}
			rules={employeeValidationRules.phone}
			render={({ field }) => (
				<InputMask
					mask="+7 (999) 999-9999"
					value={field.value}
					onChange={field.onChange}
				>
					{(inputProps) => (
						<TextField
							{...inputProps}
							label="Телефон"
							variant="outlined"
							fullWidth
							error={!!errors.phone}
							helperText={errors.phone?.message}
						/>
					)}
				</InputMask>
			)}
		/>

		<Controller
			name='birthday'
			control={control}
			rules={employeeValidationRules.birthday}
			render={({ field }) => (
				<InputMask
					mask="99.99.9999"
					value={field.value}
					onChange={field.onChange}
				>
					{(inputProps) => (
						<TextField
							{...inputProps}
							label="Дата рождения"
							variant="outlined"
							fullWidth
							placeholder='дд.мм.гггг'
							error={!!errors.birthday}
							helperText={errors.birthday?.message}
						/>
					)}
				</InputMask>
			)}
		/>

		<FormControl fullWidth variant="outlined">
			<InputLabel>Должность</InputLabel>
			<Controller
				name="role"
				control={control}
				rules={employeeValidationRules.role}
				render={({ field }) => (
					<Select
						{...field}
						label="Должность"
						error={!!errors.role}
					>
						<MenuItem value="cook">Повар</MenuItem>
						<MenuItem value="waiter">Официант</MenuItem>
						<MenuItem value="driver">Водитель</MenuItem>
					</Select>
				)}
			/>
			{errors.role && <p style={{ color: 'red', marginTop: '.5rem' }}>{errors.role.message}</p>}
		</FormControl>

		<FormControlLabel
			control={
				<Controller
					name="isArchive"
					control={control}
					render={({ field }) => (
						<Checkbox {...field} checked={field.value} />
					)}
				/>
			}
			label="В архиве"
		/>

		<Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
			{isEditMode ? 'Сохранить изменения' : 'Добавить сотрудника'}
		</Button>
	</>
);

EmployeeFormField.propTypes = {
	control: PropTypes.object.isRequired,
	errors: PropTypes.object,
	isEditMode: PropTypes.bool,
	isValid: PropTypes.bool.isRequired,
};

export default EmployeeFormField;