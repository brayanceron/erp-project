import { ReactNode, useState, useEffect, } from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router";
import 'flyonui/flyonui'
import '../index.css'


const UserProvider = ({ children }: { children: ReactNode }) => {
    const navigate = useNavigate();
    const [values, setValues] = useState<any>({ user: null, isLoading: true, error: null }); //###################
    // const [values, setValues] = useState<any>({ user: null, isLoading: true, error: false }); //********
    // const {data, isLoading, error, res} = useFetch("http://localhost:5000/api/auth/whoiam")


    async function pull() {
        const res = await fetch('http://localhost:5000/api/auth/whoiam', { credentials: 'include' });
        const user_res = await res.json();
        setValues({ user: res.ok ? user_res : null, isLoading: false, error: res.ok ? null : new Error('user unknown_ error') })//###################
        // setValues({ user: res.ok ? user_res : null, isLoading: false, error: res.ok ? true : false }) //********
        // setValues({ user:  data, isLoading, error, res })
    }

    useEffect(() => {
        pull();
    }, [])

    useEffect(() => {
        if(!values || values.isLoading || values.error){ return } // if(values.isLoading || values.error){return}
        const loadFlyonui = async () => {
            await import('flyonui/flyonui');
            window.HSStaticMethods.autoInit();
        };
        loadFlyonui();
    }, [values]);

    const logout = async () => {
        const res = await fetch('http://localhost:5000/api/auth/logout', { credentials : 'include'})
        if(res.ok) { // setValues(null);
            setValues({ user: null, isLoading: false, error: false }); //###################
            // setValues({ user: null, isLoading: false, error: null }); //********
            navigate('/login');
        }
    }
    
    const login = async ( email : string, password : string) : Promise<string | undefined> => { // const login = ({id, email, name, role} : {id : string, email : string, name : string, role : string}) => {
        const res = await fetch('http://localhost:5000/api/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({email, password}),
                credentials: 'include'
            }
        )
        const data = await res.json()
        if (res.status == 200) {
            await pull();
            navigate('/sucursal/get'); // if(values.user) { window.location.href = 'http://localhost:5173/sucursal/get'; }
        }
        else{ return data.message; }
    }


    return (
        // <UserContext.Provider value={{ user : data, isLoading, error, res, logout, login}}>
        // <UserContext.Provider value={{...values, logout, login}}>
        <UserContext.Provider value={{user: values.user, isLoading : values.isLoading, error : values.error, logout, login}}>
            { 
                values.isLoading ? <p>cargando la sesion...</p>: // !values? <p>No hay sesion</p> :
                children
            }
        </UserContext.Provider>
    );

}


export default UserProvider
