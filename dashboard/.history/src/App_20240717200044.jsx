
function App() {
  return (
    <div >
      <Router></Router>
      <Routes>
        <Route path="/"  element={<Layout/>}>
          <Route path=""  element={<Layout/>}/>
          <Route path=""  element={<Layout/>}/>

        </Route>
      </Routes>
    </div>
  );
}

export default App;
