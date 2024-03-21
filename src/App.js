import "./App.css";
import NavbarMenu from "./components/Navbar";
import { Container } from "react-bootstrap";
import "./App.css";
import Context from "./components/AuthContext.js";
function App() {
  return (
    <Container fluid>
      <div className="App">
        <Context>
          <NavbarMenu  style={{margin:0}}/>
        </Context>
      </div>
    </Container>
  );
}

export default App;
