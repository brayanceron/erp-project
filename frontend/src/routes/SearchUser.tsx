import { useEffect, useState } from "react";
import { SearchComponent } from "./SearchComponent";
import { AlertComponent } from "../components/AlertComponent";
import { Link } from "react-router"

export function SearchUser() {

    const [data, setData] = useState<any>({ data: null, isLoading: true, error: null, text: '' })
    const params = { dni: false, names: true, email: false }
    function getSearchedData(data: any, isLoading: boolean, error: Error | null, text: string) { /* console.log(data); */ setData({ data, isLoading, error, text }) }

    const { data: datas, isLoading, error, text } = data;
    return (
        <>
            <SearchComponent url="http://localhost:5000/api/usuario/search" params={params} getSearchedData={getSearchedData} />
            {
                isLoading ? <div className="flex justify-center pt-5"><span className="loading loading-bars loading-lg"></span></div>
                    : text.replace(/ /g, "") == '' ? <></>
                        : error ?
                            <div className="w-full flex justify-center pt-5">
                                <div className="sm:w-full md:w-1/3 max-w-[450px]"><AlertComponent message={error.message} /></div>
                            </div>
                            :
                            <div className="w-full flex flex-col justify-center items-center align-middle mt-15">
                                {datas.map((item: any) => {
                                    return (
                                        <UserFoundCard
                                            name = {item.names + ' ' + item.surnames} 
                                            key = {item.id}      id = {item.id} dni = {item.dni}       
                                            email = {item.email} gender = {item.gender} phone={item.phone}
                                            country_birth = {item.country_birth} city_birth = {item.city_birth} 
                                            name_sucursal = {item.name_sucursal} name_departamento = {item.name_departamento}
                                        />
                                    );
                                })}
                            </div>
            }
        </>
    )
}


function UserFoundCard({ id, name, dni, email, gender, phone, country_birth, city_birth, name_sucursal, name_departamento }: { id: string, name: string, dni: string, email: string, gender: string, phone :string, country_birth: string, city_birth: string, name_sucursal : string, name_departamento : string }) {
    return (
        <div className="sm:w-full md:w-2/3 shadow-md mb-5 pb-1 rounded-md">
            <div className="bg-gray-900 rounded-t-md py-1 px-2 w-full">
                <p className="text-white">{name}</p>
            </div>

            <div className="flex">

                <div className="w-auto m-1">
                    <img className="w-[80px]" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngall.com%2Fwp-content%2Fuploads%2F5%2FUser-Profile-PNG.png&amp;f=1&amp;nofb=1&amp;ipt=012389a2ca3994f485cc4f0b8ba61bdfeb839fddf9b26bb82c2e3421cd025174&amp;ipo=images" alt="" />
                    <Link to={`/usuario/get/${id}`} className="btn btn-outline bg-black text-white btn-xs gap-1 w-[80px] hover:bg-gray-800">
                        <span className="icon-[tabler--login-2] "></span>See
                    </Link>
                </div>

                <div className="w-full h-full">
                    <AppLabel label="NAME : "        text = {`${name}`}                 icon="text-spellcheck" />
                    <AppLabel label="DNI : "         text = {`${dni}`}                  icon="credit-card" />
                    <AppLabel label="EMAIL : "       text = {`${email}`}                icon="mail" />
                    <AppLabel label="PHONE : "       text = {`${phone}`}                icon="phone" />
                    <AppLabel label="GENDER : "      text = {`${gender}`}               icon="gender-bigender" />
                    <AppLabel label="NATIONALITY : " text = {`${country_birth}, ${city_birth}`} icon="world" />
                    <AppLabel label="BRANCH : "      text = {`${name_sucursal}`}        icon="building-factory-2" />
                    <AppLabel label="DEPARTMENT : "  text = {`${name_departamento}`}    icon="puzzle" />
                </div>
            </div>

        </div>
    )
}

function AppLabel({ label, text, icon, color = "black", bg = "transparent" }: { label: string, text: string, icon: string, color?: string, bg?: string }) {
    const [configs, setConfigs] = useState({ label, text, icon, color, bg });
    useEffect(() => { setConfigs({ ...configs, color: `text-${color}`, bg: `bg-${bg}` }); }, []);
    return (
        <div className={`px-1 py-1 mx-2 inline-block ${configs.color} ${configs.bg}`}>
            <span className={`icon-[tabler--${configs.icon}] size-5 inline-block mx-1 align-middle`}></span>
            <p className={`inline-block mx-1 text-center align-middle`}>{configs.label}{configs.text}</p>
        </div>
    )
}