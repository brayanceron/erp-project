import { useForm } from "../hooks/useForm"
import { LocationComponent } from "./LocationComponent"

type FormFields = {
    names?: string,
    lastnames?: string,
    birthday?: string,
    dni?: string,
    gender?: string,
    email?: string,
    phone?: string,
    role?: string,
    password?: string,
    country?: { id: string, name: string },
    city?: { id: string, name: string },
}

export function FormUserComponent({ defaultValues }: { defaultValues?: FormFields }) {

    const { formData, onChangeField } = useForm({ ...defaultValues }) // const { formData, onChangeField } = useForm({ ...formEmptyFields, ...defaultValues })


    function setCountry(value: string) {
        onChangeField({ target: { id: 'country', value } })
        // setField('country', value) 
    }
    function setCity(value: string) {
        onChangeField({ target: { id: 'city', value } })
        // setField('city', value)
    }



    function onSubmitForm(event: any) {
        event.preventDefault()
        const formEmptyFields: FormFields = {
            names: '', lastnames: '', birthday: '', dni: '', gender: '', email: '', phone: '', role: '', password: '', country: { id: '', name: '' },
            city: { id: '', name: '' },
        }
        let sendData = { ...formEmptyFields, ...formData }
        console.log(sendData);
    }

    return (
        <>

            <form action="" onSubmit={onSubmitForm}>
                <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[35%] xl:w-[28%]">

                    {/* <h3 className="text-2xl font-bold text-center">{titleForm} </h3> */}

                    <div className="w-auto">
                        {/* <div className=" inline-block md:w-1/2"> */}
                        <label className="label label-text" htmlFor="names"> Names </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--text-spellcheck] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" className="input grow" id="names" value={formData.names} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        {/* <div className=" inline-block md:w-1/3"> */}
                        <label className="label label-text" htmlFor="lastnames"> Lastnames </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--text-recognition] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" className="input grow" id="lastnames" value={formData.lastnames} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="birthday"> birthday </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--cake] text-base-content/80 size-5"></span>
                            </span>
                            <input type="date" className="input grow" id="birthday" value={formData.birthday} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="dni"> DNI </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--credit-card-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="number" placeholder="" className="input grow" id="dni" value={formData.dni} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="max-w-sm* w-auto pt-2">
                        {/* <h6 className="text-base text-base-content mb-1"> Gender :</h6> */}
                        <label className="label label-text" htmlFor="gender"> Gender </label>
                        <div className="w-full">
                            <ul
                                className="border-base-content/25 divide-base-content/25 flex
    flex-col divide-y rounded-box border first:*:rounded-t-box last:*:rounded-b-box sm:flex-row
    sm:divide-x sm:divide-y-0 first:*:sm:rounded-s-box first:*:sm:rounded-tr-none last:*:sm:rounded-e-box
    last:*:sm:rounded-bl-none rtl:divide-x-reverse">
                                <li className="w-full">
                                    <label className="flex cursor-pointer items-center gap-2 p-3">
                                        <input type="radio" name="gender" id="gender" value={'M'} className="radio radio-primary ms-3" onChange={onChangeField} />
                                        <span className="label label-text text-base"> Male </span>
                                    </label>
                                </li>
                                <li className="w-full">
                                    <label className="flex cursor-pointer items-center gap-2 p-3">
                                        <input type="radio" name="gender" id="gender" value={'F'} className="radio radio-primary ms-3" onChange={onChangeField} />
                                        <span className="label label-text text-base"> Female </span>
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {
                        (defaultValues?.country || defaultValues?.city) ?
                            <LocationComponent
                                setCity={setCity}
                                setCountry={setCountry}
                                countryDefault={defaultValues?.country}
                                cityDefault={defaultValues?.city}
                            />
                            :
                            <LocationComponent
                                setCity={setCity}
                                setCountry={setCountry}
                            />
                    }

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="email"> Email </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--mail-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" id="email" value={formData.email} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="phone"> Phone </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--phone-filled] text-base-content/80 size-5"></span>
                            </span>
                            <input type="number" placeholder="" className="input grow" id="phone" value={formData.phone} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="role"> Role </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--user-cog] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" placeholder="" className="input grow" id="role" value={formData.role} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="password"> Password </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--circle-key-filled] text-base-content/80 size-5" ></span>
                            </span>
                            <input type="password" placeholder="" className="input grow" id="password" value={formData.password} onChange={onChangeField} />
                        </div>
                    </div>

                    <div className="w-auto my-3">
                        <button type="submit" className="btn btn-block bg-black text-white">Registrar</button>
                    </div>

                </div>
            </form>


        </>
    )
}