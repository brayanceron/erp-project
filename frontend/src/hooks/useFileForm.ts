import { useState } from "react";

export function useFileForm(fields : any) {
    const fd = new FormData();
    for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
            fd.append(key, fields[key]);
        }
    }

    const [formData, setFormData] = useState(fd)

    function onChangeField(event: any){
        const field = event.target.id
        const value = event.target.value
        console.log(field, value);

        fd.set(field, value)
        const newfd = fd;
        // setFormData({...formData, [field] : value})
        setFormData(newfd)
    }

    function setField(field: any , value : any){
        fd.set(field, value)
        const newfd = fd;
        // setFormData({...formData, [field] : value})
        setFormData(newfd)
    }

    /* function setFields(fields : {field: any , value : any}[]) {
        let forDataTemp = formData
        fields.forEach(item => {
            forDataTemp = {...forDataTemp, [item.field] : item.value }
        })

        setFormData({...forDataTemp})
    } */

    return{
        formData,
        onChangeField,
        setField,
        // setFields
    }
}