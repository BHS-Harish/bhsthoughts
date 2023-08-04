import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Blogs from './pages/Blogs';
import ProtectedRoute from './components/ProtectedRoute';
import {store} from './store';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Blog from './pages/Blog';
const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/author/*',
    element: <ProtectedRoute ChildComponent={<Admin/>}></ProtectedRoute>
  },
  {
    path:'/blogs',
    element:<Blogs/>
  },
  {
    path:'/blog/:blogname',
    element:<Blog/>
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
