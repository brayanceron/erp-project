import { useRef, } from "react";
import { useFetch } from "../../../hooks/useFetch"

const Header = ({ user_id, getDate }: { user_id: string, getDate: (val: Date) => void }) => {
    const { data, isLoading, error } = useFetch(`http://localhost:5000/api/usuario/${user_id}?extended=1`);
    const inputDate = useRef(null)

    const onChange = () => { 
        let dateStr : string = inputDate.current!['value'];
        let dateArr = dateStr.split('-');
        const d = new Date(parseInt(dateArr[0]), parseInt(dateArr[1]) -1 )

        getDate(d); 
    }

    return (
        <>
            {
                isLoading ? <p>cargando...</p> :
                    error ? <p>Hubo un error</p> :
                        <div className="py-1 px-4 mx-2 shadow-md rounded-md flex justify-around border-2 border-gray-200">

                            <IconLabel label={data.names} icon="text-spellcheck" />
                            <IconLabel label={data.gender == 'M' ? 'Male' : 'Female'} icon="gender-bigender" />
                            <IconLabel label={data.name_country_birth} icon="world" />
                            <IconLabel label={data.name_city_birth} icon="building-estate" />

                            <IconLabel label={data.name_sucursal + `(${data.name_country_sucursal}, ${data.name_city_sucursal})`} icon="building-factory-2" />
                            <IconLabel label={data.name_departamento} icon="puzzle" />
                            <IconLabel label={data.entry_date + "(Entry date)"} icon="calendar" />

                            <input ref={inputDate} type="month" onChange={onChange} className="input input-xs w-1/12 " name="currentMonth" id="currentMonth" placeholder="Month" />

                        </div>
            }
        </>
    )
}

function IconLabel({ label, icon }: { label: string, icon: string }) {
    return (
        <div className="py-1 inline-block">
            <span className={`icon-[tabler--${icon}] size-5 inline-block mx-1 align-middle`}></span>
            <p className="inline-block mx-1 text-center align-middle text-xs">{label}</p>
        </div>
    );
}

export default Header
