import { GetSucursal } from "./routes/GetSucursal"
import { Routes, Route } from "react-router"
import { GetSucursales } from "./routes/GetSucursales"
import { UserProfile } from './components/UserProfile'
import { LayoutDashboard } from "./routes/LayoutDashboard"
import { LoginComponent } from "./components/LoginComponent"
import { GetDepartamento } from "./routes/GetDepartamento"
import { PostSucursal } from "./routes/PostSucursal"
import { PutSucursal } from "./routes/PutSucursal"
// import { FormDepartmentComponent } from "./components/FormDepartmentComponent"
import { PostDepartamento } from "./routes/PostDepartamento"
import { PutDepartamento } from "./routes/PutDepartamento"
import { SearchSucursal } from "./routes/SearchSucursal"
import { PostUser } from "./routes/PostUser"
import { PutUser } from "./routes/PutUser"
import { SearchUser } from "./routes/SearchUser";
import GetActividad from "./routes/activity/GetActividad"
import PostActividad from "./routes/activity/PostActividad"
import GetActividades from "./routes/activity/GetActividades"
import GetByDate from "./routes/activity/GetByDate"
// import { ModalComponent, openModal } from "./components/ModalComponent"
import UserProvider from "./auth/UserProvider"
import { ProtectedRoute } from "./auth/ProtectedRoute"
import { ProtectedLogin } from "./auth/ProtectedLogin"
import { useEffect } from "react"

// -------------|| Esto arregla el maldito problema ||---------------
import { useLocation } from "react-router";
import { IStaticMethods } from 'flyonui/flyonui';
import PostRol from "./routes/rol/PostRol"
import GetRoles from "./routes/rol/GetRoles"
import GetRol from "./routes/rol/GetRol"
import PutRol from "./routes/rol/PutRol"
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
// -------------|| Esto arregla el maldito problema ||---------------

function App() {

  // -------------|| Esto arregla el maldito problema ||---------------
  const location = useLocation();
  useEffect(() => {
    const loadFlyonui = async () => {
      await import('flyonui/flyonui');
      window.HSStaticMethods.autoInit();
    };
    loadFlyonui();
  }, [location.pathname]);
  // -------------|| Esto arregla el maldito problema ||---------------


  return (
    <UserProvider>
      <Routes>

        <Route element={<ProtectedRoute> <LayoutDashboard /> </ProtectedRoute>}> {/* <Route element={<LayoutDashboard />}> */}

          <Route path="/" element={<h1>root route</h1>}></Route>

          <Route path="sucursal">
            {/* <Route path="get" element={<GetSucursales />} /> */}
            <Route path="get" element={<GetSucursal />} />
            <Route path="get/:id" element={<GetSucursal />} />
            <Route path="post" element={<PostSucursal />} />
            <Route path="put/:id" element={<PutSucursal />} />
            <Route path="search" element={<SearchSucursal />} />
            <Route path="explore" element={<GetSucursales />} />
          </Route>

          <Route path="departamento" >{/* <Route path="departamento" element={<GetDepartamento />}> */}
            <Route path="get/" element={<GetDepartamento />} />
            <Route path="get/:id" element={<GetDepartamento />} />
            <Route path="post" element={<PostDepartamento />} />
            <Route path="put/:id" element={<PutDepartamento />} />
            {/* <Route path="put/:id" element={<FormDepartmentComponent idSucursal="cfc44aa0-fb50-4c13-bf82-d8ae7c3ea1ea" url="http://localhost:5000/api/departamento" />}></Route> */}
          </Route>

          <Route path="usuario">
            <Route path="get/" element={<UserProfile />} /> // usuario logeado
            <Route path="get/:id" element={<UserProfile />} />
            <Route path="post" element={<PostUser />} />
            <Route path="put/:id" element={<PutUser />} />
            <Route path="search/" element={<SearchUser />} />
          </Route>

          <Route path="actividad">
            <Route path="get/" element={<GetActividades />} />
            <Route path="get/:id" element={<GetActividad />} />
            <Route path="get/by/date" element={<GetByDate />} />
            <Route path="post/" element={<PostActividad />} /> // calendar
          </Route>

          <Route path="rol">
            <Route path="get/" element={<GetRoles/>} />
            <Route path="get/:id" element={<GetRol/>} />
            <Route path="post/" element={<PostRol />} />
            <Route path="put/:id" element={<PutRol />} />
          </Route>

          <Route path="/*" element={<h1>404. Building...</h1>} ></Route>
        </Route>

        <Route path="/login" element={<ProtectedLogin> <LoginComponent /> </ProtectedLogin>} />

      </Routes >

    </UserProvider>
  )
}

export default App