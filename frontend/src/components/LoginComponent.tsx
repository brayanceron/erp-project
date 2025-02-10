import { useState } from "react"
import { useForm } from "../hooks/useForm"
import { AlertComponent } from "./AlertComponent"

/* type loginForm = {
    email : string,
    password : string
} */
export function LoginComponent() {

    const { formData, onChangeField } = useForm({ email: '', password: '' })
    const [messageAlert, setMessageAlert] = useState("")

    const alertCode = AlertComponent({message : "Esta alerta fue creada desde codigo", initialHidden :""})
    async function onSubmitForm(event: any) {
        event.preventDefault()

        const res = await fetch('http://localhost:5000/api/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            }
        )
        const data = await res.json()
        if (res.status == 200) {
            console.log(res.headers);
            console.log(data);
            // setMessageModal("") // PARA QUITAR EL ALERT
        }
        else {
            setMessageAlert(data.message === messageAlert ? data.message+" ": data.message)
        }

    }

    return (
        <>
            <div className="shadow-md sm:w-full md:w-1/2 max-w-[380px] max-[640px]:p-1 sm:p-3 md:p-4 m-2 ">

                <h1 className="text-4xl text-center font-bold my-8">Login</h1>

                <form action="" onSubmit={onSubmitForm}>

                    <div className="auto mt-4">
                        <label className="label label-text" htmlFor="phone"> Email </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--mail] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" id="email" name="email" onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="auto mt-4">
                        <label className="label label-text" htmlFor="phone"> Password </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--lock] text-base-content/80 size-5"></span>
                            </span>
                            <input type="password" placeholder="" className="input grow" id="password" name="password" onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto mt-16 mb-5">
                        <button type="submit" className="btn btn-block bg-black text-white hover:bg-black">Login</button>
                    </div>
                    <div className="w-auto mb-5 text-center">
                        <a href="#" className="link link-animated"> Forget my password</a>
                    </div>

                </form>


            </div>

            {alertCode}

            <div className="sm:w-full md:w-1/2 max-w-[380px] m-2">
                <AlertComponent message={messageAlert} />
            </div>

        </>
    )
}



