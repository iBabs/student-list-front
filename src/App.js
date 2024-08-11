import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import View from './pages/View';
import EditUser from './pages/EditUser';
import AddUser from './pages/AddUser';
import RootLayout from './components/RootLayout';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <ToastContainer position='top-center' />
      <Routes>
        <Route path='/' element={<RootLayout />}>
          <Route index Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path= '/register' element={<Register />} />
          <Route path='/add-student' Component={AddUser} />
          <Route path='/about' Component={About} />
          <Route path='/view/:id' Component={View} />
          <Route path='/edituser/:id' Component={EditUser} />
          <Route path='*' Component={NotFound} />
        </Route>
      </Routes>

    </div>
  );
}

export default App;
