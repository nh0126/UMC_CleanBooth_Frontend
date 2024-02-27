import './App.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import axios from 'axios';


function App() {
  return (
    <div className="App">
      <div className='background'>
          <div className='ellipse'>
            <Header/>
            <Main/>
            <Footer/>
          </div>
      </div>
    </div>

  );
}

export default App;
