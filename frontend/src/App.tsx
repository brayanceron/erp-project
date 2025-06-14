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

function App() {

  return (
    <>
      <Routes>

        <Route element={<LayoutDashboard />}>

          <Route path="/" element={<h1>Root page</h1>}></Route>

          <Route path="sucursal">
            <Route path="get" element={<GetSucursales />}></Route>
            <Route path="get/:id" element={<GetSucursal />}></Route>
            <Route path="post" element={<PostSucursal />}></Route>
            <Route path="put/:id" element={<PutSucursal />}></Route>
            <Route path="search" element={<SearchSucursal />}></Route>
          </Route>

          {/* <Route path="departamento" element={<GetDepartamento />}> */}
          <Route path="departamento" >
            <Route path="get/:id" element={<GetDepartamento />}></Route>
            <Route path="post" element={<PostDepartamento />}></Route>
            <Route path="put/:id" element={<PutDepartamento />}></Route>
            {/* <Route path="put/:id" element={<FormDepartmentComponent idSucursal="cfc44aa0-fb50-4c13-bf82-d8ae7c3ea1ea" url="http://localhost:5000/api/departamento" />}></Route> */}
          </Route>

          <Route path="usuario">
            {/* <Route path="post" element={<FormUserComponent />}></Route> */}

            <Route path="get/" element={<UserProfile />}></Route> // usuario logueado
            <Route path="get/:id" element={<UserProfile />}></Route>
            <Route path="post" element={<PostUser />}></Route>
            <Route path="put/:id" element={<PutUser/>}></Route>
            <Route path="search/" element={<SearchUser/>}></Route>

          </Route>

          <Route path="actividad">
            <Route path="get/" element={<GetActividades/>}></Route>
            <Route path="get/:id" element={<GetActividad/>}></Route>
            <Route path="get/by/date" element={<GetByDate/>}></Route>
            <Route path="post/"   element={<PostActividad/>}></Route> //calendar
          </Route>

          <Route path="/*" element={<h1>404. Building...</h1>} ></Route>
        </Route>

        <Route path="/login" element={<LoginComponent />}>
        </Route>

      </Routes >

    </>
  )
}

export default App


{/* <GetSucursal /> */ }
{/* <GetSucursal id="0338e8e9-d6f8-47aa-a661-b2d8263f664f" /> */ }

{/* <GetSucursal id="43f663f7-af4e-4c49-b4ed-0eb61a761b3f"/> */ }
{/* <GetSucursales/> */ }

{/* <FormSucursalComponent/> */ }
{/* <FormSucursalComponent
          defaultValues={{
            name: "Sucursal Test",
            phone: "000000000",
            country: { id: 'ARG', name: 'xxx' },
            city: { id: '69', name: 'xxx' },
          }}
        /> */}
{/* <FormUserComponent /> */ }
{/* <FormUserComponent 
          defaultValues={
            {
              names : 'Brayan Daniel', 
              lastnames: 'Ceron Portilla',
              phone : '3003436887', 
              birthday :'04/07/1997', 
              gender : 'M',
              dni: '1085335942',
              email: 'brayan0np@gmail.com',
              role: 'admin',
              password: '123456',
              country: {id:'ARG', name:'xxx'},
              city:  {id:'68', name:'xxx'},
            }
          }
      /> */}

{/* <UserProfile idUser='8fbb558a-0d76-40fa-84ee-316d5082f34c' /> */ }


{/* <h1>App</h1> */ }



{/* <FormSucursalComponent/> */ }
{/* <FormSucursalComponent 
        defaultValues={{
          name :"Sucursal Test",
          phone : "000000000",
          country: {id:'ARG', name:'xxx'},
          city:  {id:'68', name:'xxx'},
        }}
      /> */}




{/* 
      <button className="btn bg-black" aria-haspopup="dialog" aria-expanded="false" aria-controls="modal01" data-overlay="#modal01">Open</button>
      <button className="btn btn-primary" onClick={event => openModal(event, "modal01")}>abrir m1</button>
      <ModalComponent title={"Mi dialog1"} message={"Este es un mensaje de prueba solamente M1"} id="modal01" size="" />

      <button className="btn btn-primary" onClick={event => openModal(event, "modal02")}>abrir m2</button>
      <ModalComponent title={"Mi dialog2"} message={"Este es un mensaje de prueba solamente M2"} id="modal02" size="lg" vertical="middle" horizontal="start" />
 */}





{/* <FormSucursalComponent/> */ }
{/* <LoginComponent /> */ }
