import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Produit from "./components/Produit";
import Layout from "./components/shared/Layout";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route path="Categories"  element={<Categories/>}/>
          <Route path="Produit"  element={<Produit/>}/>
          <Route path="Spf"  element={<Produit/>}/>




        </Route>
      </Routes>
      </Router>
  );
}

export default App;
