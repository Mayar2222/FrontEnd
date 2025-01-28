import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Layout from "./components/shared/Layout";
import Produit from "./components/Produit";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route path="Categories"  element={<Categories/>}/>
          <Route path="Categories"  element={<Produit/>}/>



        </Route>
      </Routes>
      </Router>
  );
}

export default App;
