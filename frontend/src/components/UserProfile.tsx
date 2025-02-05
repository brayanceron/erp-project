import { useEffect, useState } from "react"

type User = {
    id: string,
    dni: string,
    names: string,
    surnames: string,
    birthdate: string,
    gender: string,
    email: string,
    phone: string,
    role: string,
    id_sucursal: string,
    id_departamento: string,
    country_birth: any,
    city_birth: any,
}

const userEmpty: User = { id: "", dni: "", names: "", surnames: "", birthdate: "", gender: "", phone: "", email: "", role: "", id_sucursal: "", id_departamento: "", country_birth: "", city_birth: "" }
/* const userX : User = {
        id : "",
        dni: "",
        names: "",
        surnames: "",
        birthdate : "",
        gender : "",
        phone : "",
        email : "",
        role : "",
        sucursal : "",
        departamento : "",
        country_birth: "",
        city_birth: "",
    } */

export function UserProfile({ idUser }: { idUser: string }) {

    const [user, setUser] = useState(userEmpty)
    // const [user, setUser] = useState<User>()

    const [locationInfo, setLocationInfo] = useState({ country: { id: '', name: '' }, city: { id: '', name: '' } })
    const [jobInfo, setJobInfo] = useState({ sucursal: {name:'', address:''}, departamento: {} })

    async function getUser() {
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
    async function getLocationInfo(country: string, city: string) {
        if (!user?.country_birth) return

        const resCountry = await fetch(`http://localhost:5000/api/ubicacion/pais/get/${country}`)
        const resCity = await fetch(`http://localhost:5000/api/ubicacion/ciudad/get/${city}`)

        if (resCountry.status == 200 && resCity.status == 200) {
            const resCountryData = await resCountry.json()
            const resCityData = await resCity.json()
            // console.log(resCityData);
            // console.log(resCityData);
            setLocationInfo({
                country: resCountryData,
                city: resCityData
            })
        }
    }
    async function getJobInfo(sucursal: string, departamento: string) {
        // if (!user?.sucursal) return
        if (!user.id_sucursal) return
        console.log("===============");

        const resSuc = await fetch(`http://localhost:5000/api/sucursal/${sucursal}`)
        const resDep = await fetch(`http://localhost:5000/api/departamento/${departamento}`)

        if(resSuc.status == 200 && resDep.status == 200){
            const dataSuc = await resSuc.json()
            const dataDep = await resDep.json()
            
            // console.log(dataSuc);
            // console.log(dataDep);
            setJobInfo({sucursal : dataSuc, departamento : dataDep})
        }

    }


    useEffect(() => {
        getUser()
    }, [])
    // }, [idUser])

    useEffect(() => {
        getLocationInfo(user?.country_birth, user?.city_birth)
    }, [user?.country_birth])
    useEffect(() => {
        getJobInfo(user.id_sucursal, user.id_departamento)
    }, [user.id_sucursal])


    return (
        <>
            {
                user ?
                    <>

                        <div className="w-1/5 py-7 mx-4 inline-block rounded bg-gradient-to-r from-gray-900 to-gray-800">
                            <div className="w-auto">
                                <h1 className="text-2xl text-center text-white">User Profile</h1>
                            </div>

                            <div className="w-auto flex justify-center items-center my-4">
                                <img className="w-[200px]" srcSet="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG.png&f=1&nofb=1&ipt=012389a2ca3994f485cc4f0b8ba61bdfeb839fddf9b26bb82c2e3421cd025174&ipo=images" alt="" />
                            </div>

                            <div className="text-center text-white">
                                <p className="align-middle text-3xl">{user?.names} {user?.surnames}</p>
                            </div>
                            <div className="text-center text-white">
                                <p className="align-middle text-sm">{user?.email}</p>
                            </div>
                        </div>




                        <div className=" w-3/5 inline-block align-top">

                            <div className="shadow-md">
                                <div className="w-auto bg-gray-800">
                                    <h1 className="text-2xl text-center text-white">Personal Information</h1>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--fingerprint] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Id: {user?.id}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--credit-card] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Dni: {user?.dni}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--text-spellcheck] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">{user?.names} {user?.surnames}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--gender-bigender] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">
                                        Gender: {user?.gender == 'M' ? "MALE" : user?.gender == 'F' ? "FEMALE" : "No Registra"}
                                    </p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--cake] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Birthdate: {user?.birthdate}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--mail] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Email: {user?.email}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--phone] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">Phone: {user?.phone}</p>
                                </div>

                                <div className="w-1/2 px-5 py-1 inline-block">
                                    <span className="icon-[tabler--location-pin] size-5 inline-block mx-1 align-middle"></span>
                                    <p className="inline-block mx-1 text-center align-middle">{locationInfo.city.name}, {locationInfo.country.name}</p>
                                </div>

                            </div>


                            <div className="my-2 shadow-md">

                                <div className="w-auto bg-gray-800">
                                    <h1 className="text-2xl text-center text-white">Job Information</h1>
                                </div>

                                <div>
                                    <p>{JSON.stringify(jobInfo.sucursal)}</p>
                                    <p>{JSON.stringify(jobInfo.departamento)}</p>
                                    {/* <p>{jobInfo.departamento["dasfs"]}</p> */}
                                </div>
                            </div>

                        </div>





                    </>
                    :
                    <h1>No se encontro el usuario</h1>
            }
        </>
    )
}