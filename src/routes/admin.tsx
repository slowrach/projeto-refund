import { Route, Routes } from "react-router";
import { AppLayout } from "../components/AppLayout";
import { NotFound } from "../pages/NotFound";
import { Dashboard } from "../pages/Dashboard";
import { Refund } from "../pages/Refund";

export function Admin(){
   return (
      <Routes>
         <Route path="/" element={<AppLayout />} >
            <Route path="/" element={<Dashboard />} />
            <Route path="/refund/:id" element={<Refund />} />
         </Route>

         <Route path="*" element={<NotFound />} />
      </Routes>
   )
}