import { Routes, Route } from "react-router";
import { Navbar, Footer, GetDistrictData, LandingPage, CompareDistrict } from "./components";
  

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/getdistrictdata" element={
            <>
              <Navbar />
              <GetDistrictData />
              <Footer />
            </>
            } />
          <Route path="/compare" element={
            <>
              <Navbar />
              <CompareDistrict />
              <Footer />
            </>
            } />
          <Route index element={
            <>
            <Navbar />
            <LandingPage />
            <Footer />
            </>
          } />
        </Routes>
    </div>
  );
};

export default App;