import logo from './logo.svg';
import './App.css';
import Titulo from './components/Titulo';
import Recurso from './components/recursos/Recurso';
import Listado from './components/Listado';
import Usuarios from './components/Usuarios';
import Categorias from './components/Categorias';
import Detalle from './components/Detalle';

import { Link, Route, Switch} from 'react-router-dom'; 

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@1,700&family=Oswald:wght@600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Oswald&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <Route path="/" component={Titulo}/>
      <Route path="/" component={Recurso}/>
      <Route path="/usuarios" component={Usuarios}/>
      <Route path="/productos" component={Listado}/>
      <Route path="/productos" component={Detalle}/>
      <Route path="/categorias" component={Categorias}/>
    
    </div>
  );
}

export default App;
