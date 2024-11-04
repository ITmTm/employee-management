import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import './employeeCard.scss';

const EmployeeCard = ({ employee, isArchiveActive }) => {
  const cardClass = employee.isArchive && isArchiveActive ? 'employee-card archived' : 'employee-card';

	const navigate = useNavigate();

	const handleEditClick = () => {
		navigate(`/edit/${employee.id}`);
	}


	const translateRole = (role) => {
		switch (role) {
			case 'driver':
				return 'Водитель';
			case 'cook':
				return 'Повар';
			case 'waiter':
				return 'Официант';
			default:
				return role;
		}
	};

	return (
		<div className={cardClass}>
			<h2>{employee.name}</h2>
			<p>Должность: {translateRole(employee.role)}</p>
			<p>Телефон: <a href={`tel:${employee.phone}`}> {employee.phone}</a></p>
			<p>Дата рождения: {employee.birthday}</p>
			<button className='edit-button' onClick={handleEditClick}>Редактировать</button>
		</div>
	);
};

EmployeeCard.propTypes = {
  employee: PropTypes.shape({
		id: PropTypes.number.isRequired,
    name: PropTypes.string,
    role: PropTypes.string,
    phone: PropTypes.string,
    isArchive: PropTypes.bool,
		birthday: PropTypes.string.isRequired,
  }).isRequired,
	isArchiveActive: PropTypes.bool,

};

export default EmployeeCard;