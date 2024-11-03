// import {StrictMode} from "react";
import { createRoot } from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import App from './components/app/App.jsx'
import store from './redux/store.js'

import './styles/main.scss'

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
)
