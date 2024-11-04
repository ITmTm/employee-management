import { useSelector } from "react-redux";
import EmployeeCard from '../employeeCard/EmployeeCard.jsx';

import './employeeList.scss';

const EmployeeList = () => {
    const employees = useSelector((state) => state.employees.list);
    const filter = useSelector((state) => state.employees.filter);
    const isArchiveActive = filter.isArchive;

    const filteredEmployees = employees.filter((employee) => {
        const roleMatch = filter.role === '' || employee.role === filter.role;
        const archiveMatch = !filter.isArchive || employee.isArchive === filter.isArchive;
        return roleMatch && archiveMatch;
    })

    return (
        <div className='employee-list'>
            {filteredEmployees.map((employee) => (
                <EmployeeCard
                  key={employee.id}
                  employee={employee}
                  isArchiveActive={isArchiveActive}    // Передача статуса чекбокса в 'архив'
                />
            ))}
        </div>
    );
};

export default EmployeeList;