import React from 'react';
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import App from './App';
import authReducer from './store/reducers/auth';
import accessRequestReducer from './store/reducers/accessRequest';
import publicViewReducer from './store/reducers/publicView';
// import reportWebVitals from './reportWebVitals';

const store = configureStore({
    reducer: {
        auth: authReducer,
        accessRequest: accessRequestReducer,
        publicView: publicViewReducer
    }
});

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

const root = createRoot(document.getElementById('root'));

root.render(app);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
