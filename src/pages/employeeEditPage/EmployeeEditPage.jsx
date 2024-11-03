import { useParams } from "react-router-dom";
import EmployeeAddForm from "../../components/employeeAddForm/EmployeeAddForm.jsx";

import './employeeEditPage.scss';

const EmployeeEditPage = () => {
    const { id } = useParams();

    return (
        <div className='employee-edit-page'>
            <h1>Редактирование сотрудника</h1>
            <EmployeeAddForm employeeId={true} />
        </div>
    );
};

export default EmployeeEditPage;