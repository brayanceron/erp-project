import { useNavigate } from 'react-router'
import { useForm } from './useForm'
import { useState } from 'react'
import { paramsPost, usePost } from './usePost'
import { ModalComponent, openModal } from '../components/ModalComponent'

export function UsePostForm(defaultValues: any, url: string, method: Method, urlRedirect: string) {
    const idModal = "idModal"
    const navigate = useNavigate()
    const { formData, onChangeField, setFields } = useForm({ ...defaultValues })
    const [messageModal, setMessageModal] = useState('')
    const ModalPostForm = ModalComponent({ message: messageModal, id: idModal })

    function postCallback({ error, data, body }: paramsPost) {
        setMessageModal(error ? error.message : data.message)
        if (!error) { return navigate(`${urlRedirect}${method == Method.POST ? data.id : method == Method.PUT ? body.id : ''}`) }
        openModal(null, idModal)
    }

    const { sendReq, isLoading: isLoadingPostReq } = usePost(url, formData, method, postCallback)
    async function onSubmitForm(event: any) {
        event.preventDefault()
        await sendReq()
    }

    return {
        formData,
        onChangeField,
        setFields,

        onSubmitForm,
        isLoadingPostReq,
        ModalPostForm,
        idModal
    }
}
enum Method {
    POST = 'POST',
    PUT = 'PUT'
}