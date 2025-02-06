import { FormUserComponent } from "./components/FormUserComponent"
import { FormSucursalComponent } from "./components/FormSucursalComponent"
import { UserProfile } from './components/UserProfile'

function App() {

  return (
    <>
      <h1>App</h1>
      {/* <FormUserComponent /> */}
      {/*  <FormUserComponent 
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


      {/* <FormSucursalComponent/> */}
      {/* <FormSucursalComponent 
        defaultValues={{
          name :"Sucursal Test",
          phone : "000000000",
          country: {id:'ARG', name:'xxx'},
          city:  {id:'68', name:'xxx'},
        }}
      /> */}

      <UserProfile idUser='8fbb558a-0d76-40fa-84ee-316d5082f34c' />

    </>
  )
}

export default App
