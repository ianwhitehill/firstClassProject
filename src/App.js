import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Loading from "./Components/Loading";
import Error from './Components/Error';
import Report from './Components/Report';
import Selection from './Components/Selection';
import SSS from './Components/SSS';
import SSA from './Components/SSA';
import SAA from './Components/SAA';
import { useState } from "react";

function App() {
  // Setting base class
  const [myTriangle, setTriangle] = useState([]);
  const setAttribute = myAtt => {
    console.log(myAtt)
    setTriangle(myAtt)
  }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Loading />
          </Route>
          <Route path="/error">
             <Error triangle = {myTriangle}/>{/* passing object */}
          </Route>
          <Route path="/report">
            <Report triangle = {myTriangle}/>{/* passing object */}
          </Route>
          <Route path="/selection">
            <Selection />
          </Route>
          <Route path="/SSS">
            <SSS setAtt = {setAttribute}/>{/* passing props */}
          </Route>
          <Route path="/SSA">
            <SSA setAtt = {setAttribute}/>{/* passing props */}
          </Route>
          <Route path="/SAA">
            <SAA setAtt = {setAttribute}/>{/* passing props */}
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;