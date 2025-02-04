import { useForm } from "../hooks/useForm"
import { LocationComponent } from "./LocationComponent"

type FormSucursal = {
    name?: string,
    country?: { id: string, name: string },
    city?: { id: string, name: string },
    phone?: string,
    address?: string,
    description?: string
}
export function FormSucursalComponent({ defaultValues }: { defaultValues?: FormSucursal }) {

    const { formData, onChangeField, setFields } = useForm({ ...defaultValues })

    function getData(country: any, city: any) {
        const CountryAndCity = [
            { field: 'city', value: city },
            { field: 'country', value: country },
        ]
        setFields(CountryAndCity)
    }

    async function onSubmitForm(event: any) {
        event.preventDefault()
        // console.log(formData);
        const dataSend = { ...formData, country: formData.country.id, city: formData.city.id }
        console.log(dataSend);

        try {
            // const res = await fetch('http://localhost:8081/api/sucursal/', {
            const res = await fetch('http://localhost:5000/api/sucursal/', { // const res = await fetch('/api/sucursal/', {
                    body: JSON.stringify(dataSend),
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                })
                // console.log(res);
                const resdata = await res.json()
                console.log(resdata);
        } catch (error) {
            console.log("ERRor");
            console.log(error);

        }
        
    }

    return (
        <form action="" onSubmit={onSubmitForm}>
            <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[35%] xl:w-[28%]">

                <div className="w-auto">
                    {/* <div className=" inline-block md:w-1/2"> */}
                    <label className="label label-text" htmlFor="names"> Name </label>
                    <div className="input-group w-auto">
                        <span className="input-group-text">
                            <span className="icon-[tabler--text-spellcheck] text-base-content/80 size-5"></span>
                        </span>
                        <input type="text" className="input grow" value={formData.name} onChange={onChangeField} id="name" name="name" />
                    </div>
                </div>

                <LocationComponent getData={getData} />

                <div className="w-auto">
                    <label className="label label-text" htmlFor="phone"> Phone </label>
                    <div className="input-group w-auto">
                        <span className="input-group-text">
                            <span className="icon-[tabler--phone-filled] text-base-content/80 size-5"></span>
                        </span>
                        <input type="number" placeholder="" className="input grow" value={formData.phone} onChange={onChangeField} id="phone" name="phone" />
                    </div>
                </div>

                <div className="auto">
                    <label className="label label-text" htmlFor="phone"> Address </label>
                    <div className="input-group w-auto">
                        <span className="input-group-text">
                            <span className="icon-[tabler--location] text-base-content/80 size-5"></span>
                        </span>
                        <input type="text" placeholder="" className="input grow" value={formData.address} onChange={onChangeField} id="address" name="address" />
                    </div>
                </div>

                <div className="auto">
                    <label className="label label-text" htmlFor="phone"> Description </label>
                    <div className="input-group w-auto">
                        <span className="input-group-text">
                            <span className="icon-[tabler--baseline-density-small] text-base-content/80 size-5"></span>
                        </span>
                        {/* <input type="number" placeholder="" className="input grow"   id="description" name="description"/> */}
                        {/* <input type="text" placeholder="" className="input grow" /> */}
                        <textarea className="textarea max-w-sm" value={formData.description} onChange={onChangeField} id="description" name="description" aria-label="Textarea" ></textarea>
                    </div>
                </div>

                <div className="w-auto my-3">
                    <button type="submit" className="btn btn-block bg-black text-white hover:bg-black">Registrar</button>
                </div>

            </div>
        </form>

    )
}