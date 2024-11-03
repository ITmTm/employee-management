import { useNavigate } from "react-router-dom";

import EmployeeList from '../../components/employeeList/EmployeeList.jsx';
import EmployeeFilter from '../../components/employeeFilter/EmployeeFilter.jsx';
import EmployeeSort from "../../components/employeeSort/EmployeeSort.jsx";

import './employeeListPage.scss';

const EmployeeListPage = () => {
    const navigate = useNavigate();

    return (
      <div className='employee-list-page'>
        <h1>Список сотрудников</h1>
        <EmployeeFilter />
        <EmployeeSort />
        <button onClick={() => navigate('/add')} className='add-employee-button'>
          Добавить сотрудника
        </button>
        <EmployeeList />
      </div>
    );
};

export default EmployeeListPage;