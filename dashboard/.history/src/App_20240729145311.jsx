import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Categories from "./components/Categories";
import Produit from "./components/Produit";
import Layout from "./components/shared/Layout";
import Specificites from "./components/Specificites";

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route path="Categories"  element={<Categories/>}/>
          <Route path="Produit"  element={<Produit/>}/>
          <Route path="Spf"  element={<Specificites/>}/>
          <Route path="Spf"  element={<Specificites/>}/>





        </Route>
      </Routes>
      </Router>
  );
}

export default App;
