import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import PlayArea from "./components/PlayArea";
import Rules from "./components/Rules";
import GlobalStyle from "./styles/global";

const Wrapper = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={PlayArea} />
        <Route path="/rules" component={Rules} />
      </Switch>
    </>
  );
};

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Wrapper />
    </>
  );
};

export default App;
