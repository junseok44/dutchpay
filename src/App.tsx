import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { RecoilRoot } from "recoil";
import Add_Memers from "./Components/Add_Memers";
import Create_Group from "./Components/Create_Group";
import Expense from "./Components/Expense";
import { ROUTES } from "./routes";
import { ExpenseListAtom } from "./state/expenseList";
import { groupMemberAtom } from "./state/groupMembers";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<Navigate to={ROUTES.CREATE_GROUP}></Navigate>}
      ></Route>
      <Route
        path={ROUTES.CREATE_GROUP}
        element={<Create_Group></Create_Group>}
      ></Route>
      <Route
        path={ROUTES.ADD_MEMBERS}
        element={<Add_Memers></Add_Memers>}
      ></Route>
      <Route path={ROUTES.EXPENSE} element={<Expense></Expense>}></Route>
    </>
  )
);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
