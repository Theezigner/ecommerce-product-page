import { Routes, Route } from "react-router-dom";

import { MainLayout } from "./layout/mainLayouts";

import { Men } from "./pages/men";
import { Women } from "./pages/women";
import { Collections } from "./pages/collections";
import { NotFound } from "./pages/notFound";

function App() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout/>}>
        <Route path="/" element={<Women />} />
        <Route path="/collection" element={<Collections/>} />
        <Route path="/men" element={<Men />} /> 
        <Route path="/women" element={<Women />} />
         <Route path="*" element={<NotFound />} />
        {/* <Route path="/about" element={<About/>} />
        <Route path="/contact" element={<Contact />} /> */}
        </Route>
      </Routes>
    </>
  );
}

export default App;
