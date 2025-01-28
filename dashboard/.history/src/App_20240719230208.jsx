import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Layout from "./components/shared/Layout";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path="CatalogueProduits"  element={<Ca/>}/>
          <Route path="login"  element={<div>this login page</div>}/>

        </Route>
      </Routes>
      </Router>
  );
}

export default App;
