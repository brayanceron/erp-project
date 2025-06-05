import { useEffect, useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { useForm } from "../hooks/useForm";

export type SearchComponentParams = {
    url: string,
    params: any,
    getSearchedData: (data: any, isLoading: boolean, error: Error | null, text: string) => void
}

function useSearch({ url, params, getSearchedData }: SearchComponentParams) {
    const [ writing, setWriting ] = useState(false);

    const [ URL, setURL ] = useState(url)
    const { data, isLoading, error } = useFetch(URL)
    const { formData, onChangeField } = useForm({ text: '', ...params, live: false })    // const { formData, onChangeField } = useForm({ text: '', params })

    const { text, live, ...PARAMS } = formData;
    const [formString, setFormString ] = useState(JSON.stringify(params).trim());

    useEffect(()=>{
        let newParams : any = {}
        Object.keys(formData).forEach( item  =>{
            if(!(item === 'text' || item === 'live')) {newParams[item] = PARAMS[item] } // if(item !== 'text' || item !== 'live') {newParams[item] = PARAMS[item] }            
        })
        const newParamsString = JSON.stringify(newParams).trim();
        // if (formString === newParamsString) return;
        setFormString(newParamsString)
    }, [formData]);


    function onKeyUp(event: React.KeyboardEvent<HTMLInputElement>) {
        // if (isLoading) return;  // if (isLoading && formData.text.length) { return;};
        
        if (event.code === "Enter"){ fetchData(); return;}
        setTimeout(()=>{
            setWriting(false);
            if (formData.live) fetchData(); 
        }, 500)
        setWriting(true);

    }

    function fetchData( ) {
        if(writing) return;
        if (!text) return;
        let paramStringUrl = "";
        Object.keys(params).forEach(item => { if (formData[item]) paramStringUrl += `${item}=${text}&` })
        paramStringUrl += `t=${Math.floor(Math.random()*100)+1}`;
        // console.log(paramStringUrl)

        if (!paramStringUrl) { alert("debe seleccionar un parametro"); return; }
        setURL(`${url}?${paramStringUrl}`);
    }

    useEffect(() => { fetchData(); }, [formString])
    useEffect(() => { getSearchedData(data, isLoading, error, text) }, [data])  // if (isLoadingSucursales || errorSucursales) return;

    return {
        formData,
        onKeyUp,
        onChangeField,
        fetchData,
    }
}

export { useSearch };

