import PropTypes from "prop-types";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { addEmployee, updateEmployee } from "../../redux/employeeSlice.js";
import EmployeeFormField from "./EmployeeFormField.jsx";

import './employeeAddForm.scss';


const EmployeeAddForm = ({ isEditMode = false }) => {
	const { id } = useParams()
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const employee = useSelector((state) =>
		state.employees.list.find((emp) => emp.id === parseInt(id))
	);

	const { control, handleSubmit, setValue, reset, formState: { errors, isValid } } = useForm({
		mode: 'onBlur',
		defaultValues: {
			name: '',
			phone: '',
			birthday: '',
			role: '',
			isArchive: false,
		}
	});

	useEffect(() => {
		if (isEditMode && employee) {
			setValue('name', employee.name);
			setValue('phone', employee.phone);
			setValue('birthday', employee.birthday);
			setValue('role', employee.role);
			setValue('isArchive', employee.isArchive);
		}
	}, [isEditMode, employee, setValue]);


	const onSubmit = (data) => {
		if (isEditMode) {
			const updatedEmployee = { id: employee.id, ...data };
			dispatch(updateEmployee(updatedEmployee));
			toast.success('Данные сотрудника обновлены успешно!')
		} else {
			const newEmployee = {
				id: Date.now(),
				...data,
				isArchive: data.isArchive || false,
			};

			dispatch(addEmployee(newEmployee));
			toast.success('Сотрудник добавлен успешно!');
			reset();
		}
		navigate('/');
	};

	return (
		<form className='employee-add-form' onSubmit={handleSubmit(onSubmit)}>
			<EmployeeFormField
				control={control}
				errors={errors}
				isEditMode={isEditMode}
				isValid={isValid}
			/>
			<button type='button' onClick={() => navigate('/')} className='back-button'>Назад</button>
		</form>
	);
};

EmployeeAddForm.propTypes = {
	isEditMode: PropTypes.bool,
};

export default EmployeeAddForm;