import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "../../redux/employeeSlice.js";

import './employeeFilter.scss';

const EmployeeFilter = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.employees.filter);

    const handleRoleChange = (e) => {
        dispatch(setFilter({ ...filter, role: e.target.value }));
    };

    const handleArchiveChange = (e) => {
        dispatch(setFilter({ ...filter, isArchive: e.target.checked }));
    };

    return (
        <div className='employee-filter'>
            <label>
                Должность:
                <select value={filter.role} onChange={handleRoleChange}>
                    <option value="">Все</option>
                    <option value="cook">Повар</option>
                    <option value="waiter">Официант</option>
                    <option value="driver">Водитель</option>
                </select>
            </label>

            <label>
                <input
                    type="checkbox"
                    checked={filter.isArchive}
                    onChange={handleArchiveChange}
                />
                В архив
            </label>
        </div>
    );
};

export default EmployeeFilter;