
import './App.css';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import { Home } from './pages/Home';
import { CreateRecipe } from './pages/create-receipe.js';
import { SavedRecipes } from './pages/saved-receipe.js';
import { Auth } from './pages/auth.js';

import {Navbar} from "./components/navbar"


function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <Routes>

            <Route path='/' element ={<Home/>}/>
            <Route path='/auth' element ={<Auth/>}/>
            <Route path='/create-receipe' element ={<CreateRecipe/>}/>
            <Route path='/saved-receipe' element ={<SavedRecipes/>}/>
          </Routes>


        </Router>
    </div>
  );
}

export default App;
