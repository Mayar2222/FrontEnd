import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Products from "./components/Products";
import Layout from "./components/shared/Layout";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route index  element={<Dashboard/>}/>
          <Route path="products"  element={<Products/>}/>

        </Route>
        <Route />
      </Routes>
      </Router>
  );
}

export default App;
