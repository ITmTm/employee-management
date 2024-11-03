import AppRouter from "../../routes/AppRouter.jsx";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

import './app.scss';

const App = () => {
	return (
		<div className='App'>
			<AppRouter />
			<ToastContainer position={"top-right"} autoClose={3000} />
		</div>
	)
}


export default App;