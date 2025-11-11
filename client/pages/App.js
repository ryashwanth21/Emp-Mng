
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Search from './pages/Search';
import Update from './pages/Update';
import Delete from './pages/Delete';
import Get from './pages/Get';
function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path ='/' element={<Home/>}></Route>
      <Route path ="/add" element={<Add/>} ></Route>

      <Route path="/search" element={<Search/>}></Route>
      <Route path="/update" element={<Update/>}></Route>
      <Route path="/delete" element={<Delete/>}></Route>
      <Route path="/get" element={<Get/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
