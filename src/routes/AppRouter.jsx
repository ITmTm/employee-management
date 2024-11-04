import { Route, Routes } from 'react-router-dom';

import EmployeeListPage from '../pages/employeeListPage/EmployeeListPage.jsx';
import EmployeeEditPage from '../pages/employeeEditPage/EmployeeEditPage.jsx';
import EmployeeAddForm from "../components/employeeAddForm/EmployeeAddForm.jsx";

const AppRouter = () => (
    <Routes>
        <Route path='/' element={<EmployeeListPage />} />
        <Route path='edit/:id' element={<EmployeeEditPage />} />
        <Route path='/add' element={<EmployeeAddForm />} />
    </Routes>
);

export default AppRouter