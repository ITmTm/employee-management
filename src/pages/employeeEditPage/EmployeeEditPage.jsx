import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EmployeeAddForm from "../../components/employeeAddForm/EmployeeAddForm.jsx";

import './employeeEditPage.scss';

const EmployeeEditPage = () => {
    const { id } = useParams();
    const employee = useSelector(state => state.employees.list.find(emp => emp.id === Number(id)));


    return (
        <div className='employee-edit-page'>
            <h1>Редактирование сотрудника</h1>
          {employee ? (
            <EmployeeAddForm isEditMode={true} />
          ) : (
            <p>Сотрудник не найден</p>
          )}
        </div>
    );
};

export default EmployeeEditPage;