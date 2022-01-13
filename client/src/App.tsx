import './App.css';
import Navbar from "./components/Layout/Navbar"
import Body from './components/Layout/Body';
import Sidebar from './components/Layout/Sidebar';
import SocketProvider from './components/Socket.Provider';



const App = () => {

  return (
    <div className="App" id="chat-app">
      <SocketProvider>
        <Navbar />
        <div id="app">

          <Sidebar />
          <Body />
        </div>
      </SocketProvider>
    </div>
  );
}

export default App;
