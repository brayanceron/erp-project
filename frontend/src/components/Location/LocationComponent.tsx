import { useLocation, LocationProps } from "./useLocation";


export function LocationComponent({ getData, countryDefault, cityDefault, filter = false }: LocationProps) {

    console.log("=============== RENDER  Location =============================");

    const { isLoadingCountries, isLoadingCities, errorCountries, errorCities, formData,
        onChangeField, countries, cities } = useLocation({ getData, countryDefault, cityDefault, filter })

    return (
        <div className="my-2">
            {/* <h4> {title} </h4> */}

            <div className="w-auto">
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


            <div className="w-auto">
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

            <button className="btn btn-primary my-5 py-1" onClick={event => {
                event.preventDefault()
                console.log(">>>>", formData);
                // console.log(countrySelected, citySelected);
            }}>
                ok
            </button>

        </div>
    )
}