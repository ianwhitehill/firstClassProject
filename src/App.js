import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom";
import Loading from "./Components/Loading";
import Main from './Components/Main';

function App() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Loading />
          </Route>
          <Route path='/main'>
            <Main />
          </Route>
        </Switch>
      </BrowserRouter>
    );
}

export default App;
