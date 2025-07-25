import { useRef } from "react";
import { useSearch } from "../hooks/useSearch";

export type SearchComponentParams = {
    url: string,
    params: any,
    getSearchedData: (data: any, isLoading: boolean, error: Error | null, text: string) => void
}


export function SearchComponent(componentParams: SearchComponentParams) {
    const inptText = useRef(null)
    const { onKeyUp, formData, onChangeField, fetchData } = useSearch(componentParams); //on keyup para activa busqueda en tiempo real

    return (
        <>
            <div className="w-full flex justify-center items-center pt-8 pb-2">
                    <span className="icon-[tabler--user-search] size-20"></span>
            </div>
            
            <div className="w-full flex justify-center items-center pt-2 pb-2">
                <div className="sm:w-full max-w-[500px]">
                    <div className="relative">
                        <span  onClick={ e => onChangeField({ ...e, target: { id: 'live', value: !formData.live } })} className={`icon-[tabler--access-point] ${formData.live ? "bg-green-600" : "bg-gray-300"} text-base-content absolute start-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2 hover:cursor-pointer hover:bg-gray-500`} ></span>
                        <input ref={inptText} onKeyUp={onKeyUp} onChange={onChangeField} name="text" id="text" value={formData.text} className="input ps-8 rounded-full text-center" type="text" placeholder="Search for an action" role="combobox" aria-expanded="false" data-combo-box-input="" />
                        <span  onClick={_ => fetchData()} className="icon-[tabler--search] text-base-content absolute end-3 top-1/2 size-4 flex-shrink-0 -translate-y-1/2 hover:cursor-pointer hover:bg-gray-500" ></span>
                    </div>
                </div>
            </div>


            <div className="flex w-full gap-3 horizontal-scrollbar justify-center mt-1">
                {
                    formData &&
                    Object.keys(formData).map(item => {
                        if (Object.keys(componentParams.params).includes(item)) return <CheckedOption key={item} nameKey={item} value={formData[item]} onChangeParams={onChangeField} />
                    })
                }
            </div>
        </>
    )
}


function CheckedOption({ nameKey, value, onChangeParams }: { nameKey: string, value: boolean, onChangeParams: (event: any) => void }) {
    return (
        <div className="flex items-center" key={nameKey}>
            <input 
                type="checkbox"
                className="checkbox checkbox-xs"
                id = {nameKey} 
                name = {nameKey}
                defaultChecked={value} 
                onChange={event => onChangeParams({ target: { id: nameKey, value: event.target.checked } })}
            />
            <label className="label label-text text-xs" htmlFor={nameKey} > {nameKey} </label>
        </div>
    )
}
