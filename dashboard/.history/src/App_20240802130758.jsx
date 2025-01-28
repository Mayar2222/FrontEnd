import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import AjouterCommande from "./components/AjouterCommande";
import Categories from "./components/Categories";
import Historique from "./components/Historique";
import ListComm from "./components/ListComm";
import Login from "./components/Login";
import Produit from "./components/Produit";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/shared/Layout";
import Specificites from "./components/Specificites";
import Stock from "./components/Stock";
import { AuthProvider } from "./components/AuthContext";
import Register from "./components/Register";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="categories" element={<Categories />} />
            <Route path="produit" element={<Produit />} />
            <Route path="spf" element={<Specificites />} />
            <Route path="historique" element={<Historique />} />
            <Route path="stock" element={<Stock />} />
            <Route path="ajoutercomm" element={<AjouterCommande />} />
            <Route path="listecomm" element={<ListComm />} />
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
