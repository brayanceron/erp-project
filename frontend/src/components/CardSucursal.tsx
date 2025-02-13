export type CardSucursalType = {
    name : string,
    country: string,
    city: string,
    address: string,
    phone : string
}
export function CardSucursal( { name , country, city, address, phone}:CardSucursalType ) {
    return (
        <>
            <div className="shadow-md bg-white w-[320px] m-2 p-6 rounded-md">
                <h1 className="text-lg font-bold my-0">{name}</h1>

                <div className="divider m-0"></div>


                <div className="w-full grid grid-cols-2 pt-2">

                    <div className="w-auto m-0 p-0 gap-0">
                        <div className="flex m-0 p-0 items-center justify-start h-fit gap-0">
                            <span className="icon-[tabler--world] m-0 p-0 mr-1"></span>
                            <p className="text-sm m-0 p-0 h-fit">{country}</p>
                        </div>
                        <div className="flex m-0 p-0 align-top items-start justify-start h-fit gap-0">
                            <span className="icon-[tabler--world3] align-top m-0 p-0 mr-1 bg-transparent h-fit"></span>
                            <p className="text-xs text-gray-400 align-top m-0 p-0 h-fit">country </p>
                        </div>
                    </div>

                    <div className="w-auto m-0 p-0">
                        <div className="flex m-0 p-0 items-center justify-start ">
                            <span className="icon-[tabler--building-estate] m-0 p-0 mr-1"></span>
                            <p className="text-sm m-0 p-0">{city}</p>
                        </div>
                        <div className="flex m-0 p-0 align-top items-start justify-start h-auto">
                            <span className="icon-[tabler--world3] m-0 p-0 mr-1 bg-transparent"></span>
                            <p className="text-xs text-gray-400 align-text-top m-0 p-0">city </p>
                        </div>
                    </div>

                    <div className="w-auto m-0 p-0">
                        <div className="flex m-0 p-0 items-center justify-start ">
                            <span className="icon-[tabler--map-pin] m-0 p-0 mr-1"></span>
                            <p className="text-sm m-0 p-0">{address}</p>
                        </div>
                        <div className="flex m-0 p-0 align-top items-start justify-start h-auto">
                            <span className="icon-[tabler--world3] m-0 p-0 mr-1 bg-transparent"></span>
                            <p className="text-xs text-gray-400 align-text-top m-0 p-0">Address </p>
                        </div>
                    </div>

                    <div className="w-auto m-0 p-0">
                        <div className="flex m-0 p-0 items-center justify-start ">
                            <span className="icon-[tabler--phone] m-0 p-0 mr-1"></span>
                            <p className="text-sm m-0 p-0">{phone}</p>
                        </div>
                        <div className="flex m-0 p-0 align-top items-start justify-start h-auto">
                            <span className="icon-[tabler--phone] m-0 p-0 mr-1 bg-transparent"></span>
                            <p className="text-xs text-gray-400 align-text-top m-0 p-0">Phone </p>
                        </div>
                    </div>

                </div>



                <div className="w-auto flex justify-end gap-1 mt-2">
                    <button className="btn btn-outline btn-xs gap-1"><span className="icon-[tabler--login-2] "></span>See</button>
                    <button className="btn  bg-black text-white btn-xs gap-1 hover:bg-gray-800"> <span className="icon-[tabler--edit]"></span>Edit</button>
                </div>

            </div>
        </>
    )
}

