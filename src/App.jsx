import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import MejoraForm from "./pages/MejoraForm/MejoraForm";
import Seguimiento from "./pages/Seguimiento/Seguimiento";
import Administrator from "./pages/Admin/Administrator/Administrator";
import AdministratorFormEdit from "./pages/Admin/Administrator/AdministratorFormEdit";
import AdministratorChampion from "./pages/Admin/Administrator/AdministratorChampion";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="registroIdea" element={<MejoraForm />} />
            <Route path="seguimiento" element={<Seguimiento/>}/>
            <Route path="administrador" element={<Administrator/>}/>
            <Route path="administrador/editar/:id" element={<AdministratorFormEdit/>}/>
            <Route path="administrador/asignarChampion/:id" element={<AdministratorChampion/>}/>
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App