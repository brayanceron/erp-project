import { useState } from "react";

export function useForm(fields : any) {
    const [formData, setFormData] = useState(fields)

    function onChangeField(event: any){
        const field = event.target.id
        const value = event.target.value
        console.log(field, value);

        setFormData({...formData, [field] : value})
    }

    function setField(field: any , value : any){
        setFormData({...formData, [field] : value})
    }

    return{
        formData,
        onChangeField,
        setField
    }
}