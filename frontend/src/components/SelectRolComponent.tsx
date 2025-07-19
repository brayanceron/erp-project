import { useFetch } from "../hooks/useFetch"

const SelectRolComponent = ( {value, onChangeField} : {value : string, onChangeField : (event : any)=> void} ) => {
    const { data: roles, isLoading, error } = useFetch('http://localhost:5000/api/rol')

    return (
        <>
                <select
                    /* data-select='{
    "placeholder": "Select your role",
    "toggleTag": "<button type=\"button\" aria-expanded=\"false\"></button>",
    "toggleClasses": "advance-select-toggle",
    "hasSearch": true,
    "dropdownClasses": "advance-select-menu max-h-52 pt-0 vertical-scrollbar rounded-scrollbar",
    "optionClasses": "advance-select-option selected:active",
    "optionTemplate": "<div class=\"flex justify-between items-center w-full\"><span data-title></span><span class=\"icon-[tabler--check] flex-shrink-0 size-4 text-primary hidden selected:block \"></span></div>",
    "extraMarkup": "<span class=\"icon-[tabler--caret-up-down] flex-shrink-0 size-4 text-base-content absolute top-1/2 end-3 -translate-y-1/2 \"></span>"
    }' */
                    // className="hidden"
                    className="select appearance-none max-w-sm input grow"
                    // className="hidden select appearance-none max-w-sm input grow"

                    name="role" id="role"
                    value={value} onChange={onChangeField}
                >
                    {/* <option value="">Choose</option> */}
                    {
                        isLoading ? <option value="">Cargando...</option> :
                            error ? <option value="">Error {error.message}</option> :
                                roles.map((item: any) => { return (<option key={item.id} value={item.id}>{item.name}</option>) })
                    }
                </select>

        </>
    )
}

export default SelectRolComponent
// 
