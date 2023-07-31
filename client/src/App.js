
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

//pages
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login'
import Home from './pages/Home'
import ShopDetails from './components/ShopDetails';
import Cart from './components/Cart'
import AddProduct from './components/AddProducts'
import  PaymentForm  from './components/PaymentForm';


function App() {
  return (
    <Router>
      <div className="App">
      <Header />
      
        <Routes>

          <Route exact path='/' element={<LandingPage />}></Route>
          <Route exact path="/home" element={<Home />}></Route>
          <Route exact path='/product/:id' element={<ShopDetails />}></Route>
          <Route exact path="/login" element={<Login />}></Route>  
          <Route exact path="/add-products" element={<AddProduct />}></Route> 

        </Routes>

      </div>
    </Router>

  );
}

export default App;