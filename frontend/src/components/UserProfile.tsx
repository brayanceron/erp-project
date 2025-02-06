import { useEffect, useState } from "react"

type User = {
    id: string,
    names: string,
    surnames: string,
    dni: string,
    gender: string,
    birthdate: string,
    email: string,
    phone: string,
    role: string,
    password: string,
    entry_date: string,
    country_birth: string,
    city_birth: string,

    id_country_birth: string,
    name_country_birth: string,
    name_city_birth: string,
    id_city_birth: string,

    id_departamento: string,
    name_departamento: string,
    email_departamento: string,
    phone_departamento: string,

    id_sucursal: string,
    name_sucursal: string,
    phone_sucursal: string,
    address_sucursal: string,
    id_country_sucursal: string,
    name_country_sucursal: string,
    id_city_sucursal: string,
    name_city_sucursal: string,

}


const emptyUser: User = {
    id: '', names: '', surnames: '', dni: '', gender: '', birthdate: '', email: '', phone: '', role: '', password: '', entry_date: '', country_birth: '', city_birth: '',
    id_country_birth: '', name_country_birth: '', name_city_birth: '', id_city_birth: '',
    id_departamento: '', name_departamento: '', email_departamento: '', phone_departamento: '',
    id_sucursal: '', name_sucursal: '', phone_sucursal: '', address_sucursal: '', id_country_sucursal: '', name_country_sucursal: '', id_city_sucursal: '', name_city_sucursal: '',

}

export function UserProfile({ idUser }: { idUser: string }) {

    const [user, setUser] = useState<User>(emptyUser)

    async function getUserData() {
        const res = await fetch(`http://localhost:5000/api/usuario/${idUser}`)
        // console.log(res);

        if (res.status == 200) {
            const data = await res.json()
            // console.log(data);

            const birthday = new Date(data.birthdate)
            data.birthdate = `${birthday.getDay()}/${birthday.getMonth()}/${birthday.getFullYear()}`
            setUser(data)
        }
    }

    useEffect(() => {
        getUserData()
    }, [])
    // }, [idUser])

    return (
        <>
            {
                user ?
                    <div className="sm:flex md:flex md:px-4 mx-2">

                        <div className="sm:w-full md:w-1/5 min-h-full py-7 sm:mx-1 sm:mb-2 md:my-0 md:mx-4 rounded bg-gradient-to-r from-gray-900 to-gray-800">
                            <div className="w-auto">
                                <h1 className="text-2xl text-center text-white">User Profile</h1>
                            </div>

                            <div className="w-auto flex justify-center items-center my-4">
                                <img className="w-[200px]" srcSet="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG.png&f=1&nofb=1&ipt=012389a2ca3994f485cc4f0b8ba61bdfeb839fddf9b26bb82c2e3421cd025174&ipo=images" alt="" />
                            </div>

                            <div className="text-center text-white">
                                <p className="align-middle text-3xl">{user.names} {user.surnames}</p>
                            </div>
                            <div className="text-center text-white">
                                <p className="align-middle text-sm">{user.email}</p>
                            </div>
                        </div>



                        <div className="sm:w-full md:w-3/5 align-top flex-1">

                            <div className="shadow-md">
                                <div className="w-auto bg-gray-800">
                                    <h1 className="text-2xl text-center text-white">Personal Information</h1>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--fingerprint] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Id: {user.id}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--credit-card] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Dni: {user.dni}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--text-spellcheck] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">{user.names} {user.surnames}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--gender-bigender] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">
                                        Gender: {user.gender == 'M' ? "MALE" : user.gender == 'F' ? "FEMALE" : "No Registra"}
                                    </p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--cake] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Birthdate: {user.birthdate}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--mail] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Email: {user.email}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--phone] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Phone: {user.phone}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--location-pin] size-5 inline-block mx-1 align-middle"></span>
                                    {/* <p className="inline-block mx-1 text-center align-middle">{locationInfo.city.name}, {locationInfo.country.name}</p> */}
                                    <p className="inline-block mx-1 text-center align-middle">{user.name_city_birth}, {user.name_country_birth}</p>
                                </div>

                            </div>



                            <div className="mt-2 shadow-md ">

                                <div className="w-auto bg-gray-800">
                                    <h1 className="text-2xl text-center text-white">Job Information</h1>
                                </div>


                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--calendar] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Entry Date: {user.entry_date}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--world-pin] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Place: {user.name_country_sucursal}, {user.name_city_sucursal}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--user-share] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Role: {user.role}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--mail] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Email: {user.email}</p>
                                </div>



                                <div className="sm:flex justify-center w-full">

                                    <div className="sm:w-full md:w-1/2 ml-2 shadow-sm my-2  ">
                                        <div className="w-auto bg-gray-800">
                                            <h1 className="text-xl text-center text-white">Sucursal</h1>
                                        </div>

                                        <div className="w-auto px-5 py-1">
                                            <span className="icon-[tabler--fingerprint] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle text-sm">id: {user.id_sucursal}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--text-spellcheck] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">Sucursal: {user.name_sucursal}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--phone] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">phone: {user.phone_sucursal}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--pointer-pin] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">Address: {user.address_sucursal}</p>
                                        </div>

                                        {/* <div>
                                        <button className="btn btn-sm btn-secondary w-auto p-0">Ver</button>
                                    </div> */}

                                    </div>


                                    <div className="sm:w-full md:w-1/2 mx-2 shadow-sm my-2  align-top">
                                        <div className="w-auto bg-gray-800">
                                            <h1 className="text-xl text-center text-white">Deparatament</h1>
                                        </div>

                                        <div className="w-auto px-5 py-1">
                                            <span className="icon-[tabler--fingerprint] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle text-sm">id: {user.id_departamento}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--text-spellcheck] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">Department: {user.name_departamento}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--phone] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">phone: {user.phone_departamento}</p>
                                        </div>

                                        <div className="w-auto px-5 py-1 inline-block">
                                            <span className="icon-[tabler--mail] size-5 inline-block mx-1 align-middle"></span>
                                            <p className="inline-block mx-1 text-center align-middle">email: {user.email_departamento}</p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>


                    </div>
                    :
                    <h1>No se encontro el usuario</h1>
            }
        </>
    )
}