import logo from './logo.svg';
import './App.css';
import Titulo from './components/Titulo';
import Recurso from './components/recursos/Recurso';

function App() {
  return (
    <div className="App">
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Bai+Jamjuree:ital,wght@1,700&family=Oswald:wght@600&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Oswald&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet"></link>
      <Titulo/>
      <Recurso/>
    
    </div>
  );
}

export default App;
