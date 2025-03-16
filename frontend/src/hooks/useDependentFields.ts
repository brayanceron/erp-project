import { useEffect } from "react"
import { useForm } from "./useForm"
import { useFetch } from "./useFetch"

export type LocationProps = {
    getData: (fieldI: any, fieldII: any) => void, // getData: (fieldI: string, fieldII: string)  => void,

    urlFieldI: string,
    // setUrlFieldI?: (newUrl: string) => void,
    urlFieldII: string,
    setUrlFieldII: (newUrl: string) => void,

    onChangeFieldI: (fieldI: string, fieldII: string) => string,
    onChangeFieldII: ((fieldI: string, fieldII: string) => string )| undefined,

    fieldIDefault?: { id: string, name: string },
    fieldIIDefault?: { id: string, name: string },
}


export function useDependentFields({ getData, urlFieldI, urlFieldII, setUrlFieldII, onChangeFieldI, onChangeFieldII, fieldIDefault, fieldIIDefault }: LocationProps) {

    const { formData, onChangeField, setField: setFieldFormData } = useForm({ fieldI: '', fieldII: '' }) // const {formData, onChangeField, setField} = useForm({country : {id:'', name:''}, city : {id:'', name:''} })
    // const { formData, onChangeField, setField } = useForm({ sucursal: fieldIDefault ? fieldIDefault.id : '', department: fieldIIDefault ? fieldIIDefault.id : '' })

    const { data: fieldIData, isLoading: isLoadingFieldI, error: errorFieldI } = useFetch(urlFieldI)
    const { data: fieldIIData, error: errorFieldII, isLoading: isLoadingFieldII } = useFetch(urlFieldII)

    useEffect(() => {
        if (errorFieldI === null && isLoadingFieldI === false) {
            let val = fieldIDefault ? fieldIData.find((item: any) => item['id'] == fieldIDefault['id']) : fieldIData[0]
            if (!val) { val = fieldIData[0] }  // alert  countryDefault not found 
            setFieldFormData('fieldI', val['id'])
        }
        else { setFieldFormData('fieldI', '') }
    }, [fieldIData])

    useEffect(() => {
        if (!formData.fieldI) { setUrlFieldII(''); return }
        setUrlFieldII(onChangeFieldI(formData.fieldI, formData.fieldII))
    }, [formData.fieldI])

    useEffect(() => {
        // if (errorFieldII === null && isLoadingFieldII === false && formData.country) { // if (cities && formData.country) {
        if (errorFieldII === null && isLoadingFieldII === false && formData.fieldI) { // if (cities && formData.country) {
            let val = fieldIIDefault ? fieldIIData.find((item: any) => item['id'] == fieldIIDefault['id']) : fieldIIData[0]
            if (!val) { val = fieldIIData[0] } // alert  cityDefault not found 
            setFieldFormData('fieldII', val['id'])
        }
        else { setFieldFormData('fieldII', '') }
    }, [fieldIIData])

    useEffect(() => {
        onSelect()
        if(onChangeFieldII) onChangeFieldII(formData.fieldI, formData.fieldII)
    }, [formData.fieldII])


    function onSelect() {
        if (!fieldIData || !fieldIIData) { getData('', ''); return }

        const selectedFieldI = fieldIData.find((item: any) => item['id'] == formData.fieldI) // const itemSelectedCountries = countries.find(item => item['id'] == formData.country)
        const selectedFieldII = fieldIIData.find((item: any) => item['id'] == formData.fieldII) // const itemSelectedCity = cities.find(item => item['id'] == formData.city)

        // if (!itemSelectedCountries || !itemSelectedCity) return;
        getData(selectedFieldI, selectedFieldII)
    }

    return {
        fielIStatus: { fieldIData, isLoadingFieldI, errorFieldI },
        fielIIStatus: { fieldIIData, isLoadingFieldII, errorFieldII },

        formData, onChangeField,
        onSelect
    }

}



/* export function usePro(
    getData: (fieldI: any, fieldII: any) => void,
    urlFieldI: string, 
    urlFieldII: string,
    setUrlFieldII: (newUrl: string) => void,
    onChangeFieldI: (fieldI: string, fieldII: string) => string,
    fieldIDefault: { id: string, name: string } | undefined = undefined,
    fieldIIDefault: { id: string, name: string } | undefined = undefined) { 
    */