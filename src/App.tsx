import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import Add_Memers from "./Components/Add_Memers";
import Create_Group from "./Components/Create_Group";
import Expense from "./Components/Expense";

const App = () => {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create_Group></Create_Group>}></Route>
          <Route path="/members" element={<Add_Memers></Add_Memers>}></Route>
          <Route path="/expense" element={<Expense></Expense>}></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
};

export default App;
