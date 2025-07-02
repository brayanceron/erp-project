import { useLocation, LocationProps } from "./useLocation";


export function LocationComponent({ getData, countryDefault, cityDefault, filter = false, horizontal=false }: LocationProps) {


    const { isLoadingCountries, isLoadingCities, errorCountries, errorCities, formData,
        onChangeField, countries, cities } = useLocation({ getData, countryDefault, cityDefault, filter })

    return (
        <div className={`my-2 w-full ${horizontal? ' sm:flex gap-1' : ''}`}>
            {/* <h4> {title} </h4> */}

            <div className="w-full">
                <label className="label label-text" htmlFor="country"> Country </label>
                <div className="input-group w-auto">

                    <span className="input-group-text">
                        <span className="icon-[tabler--world] text-base-content/80 size-5"></span>
                    </span>

                    {
                        isLoadingCountries ?
                            <span className="loading loading-infinity loading-lg"></span>
                            : errorCountries !== null ?
                                <select className="select appearance-none input grow is-invalid"><option value="">Error</option></select>
                                :
                                <select className="select appearance-none input grow"
                                    aria-label="select"
                                    name="country"
                                    id="country"
                                    onChange={onChangeField}
                                    value={formData.country}
                                >
                                    {countries.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                    }
                </div>
            </div>


            <div className="w-full">
                <label className="label label-text" htmlFor="city"> City </label>
                <div className="input-group w-auto">

                    <span className="input-group-text">
                        <span className="icon-[tabler--building-estate] text-base-content/80 size-5"></span>
                    </span>

                    {
                        isLoadingCities || isLoadingCountries ?
                            <span className="loading loading-infinity loading-lg"></span>
                            : errorCities !== null ?
                                <select className="select appearance-none input grow is-invalid"><option value="">Error</option></select>
                                :
                                <select
                                    className="select appearance-none input grow"
                                    aria-label="select"
                                    name="city"
                                    id="city"
                                    onChange={onChangeField}
                                    value={formData.city}
                                >
                                    {/* {cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)} */}
                                    {cities.map((item: any) => <option key={item.id} value={item.id}>{item.name}</option>)}
                                </select>
                    }
                </div>
            </div>


        </div>
    )
}