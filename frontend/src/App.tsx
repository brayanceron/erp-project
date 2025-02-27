import { FormUserComponent } from "./components/FormUserComponent"
import { FormSucursalComponent } from "./components/FormSucursalComponent"
import { GetSucursal } from "./routes/GetSucursal"
import { Routes, Route } from "react-router"
import { GetSucursales } from "./routes/GetSucursales"
import { UserProfile } from './components/UserProfile'
import { LayoutDashboard } from "./routes/LayoutDashboard"
import { LoginComponent } from "./components/LoginComponent"
// import { ModalComponent, openModal } from "./components/ModalComponent"

function App() {

  return (
    <>
      <Routes>

        <Route element={<LayoutDashboard />}>

          <Route path="/" element={<h1>Root page</h1>}></Route>

          <Route path="sucursal">
            <Route path="get" element={<GetSucursales />}></Route>
            <Route path="get/id" element={<GetSucursal id="26e51225-97bd-4c9f-99ec-9de94605ab38" />}></Route>
            <Route path="post" element={<FormSucursalComponent />}></Route>
          </Route>

          <Route path="usuario">
            <Route path="post" element={<FormUserComponent />}></Route>
            <Route path="get/id" element={<UserProfile idUser='8fbb558a-0d76-40fa-84ee-316d5082f34c' />}></Route>
          </Route>

          <Route path="/*" element={<h1>404. Building...</h1>} ></Route>
        </Route>

        <Route path="/login" element={<LoginComponent/>}>
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
