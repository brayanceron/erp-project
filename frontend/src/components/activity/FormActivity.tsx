import { Method } from "../../hooks/usePost"
import { UsePostForm } from "../../hooks/usePostForm";

const FormActivity = ({ defaultValues, url, method = Method.POST }: { defaultValues?: {}, url: string, method?: Method }) => {
    defaultValues = {...defaultValues, date : getTodayDate(), id_user : '725b5a63-41fe-4de0-927d-15532a8592fc' }    
    console.log(defaultValues)
    const { formData, isLoadingPostReq: isLoading, onChangeField, onSubmitForm, ModalPostForm } = UsePostForm(defaultValues, url, method, '/')

    return (
        <>
            {ModalPostForm}
            <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[55%] xl:w-[38%] max-w-[650px]">
                <form onSubmit={onSubmitForm} >

                    <h3 className="text-2xl font-bold text-center">{method == Method.PUT ? "Actualizar" : method == Method.POST ? "Registrar" : ''}</h3>

                    <div className="w-auto">
                        <label className="label label-text" htmlFor="title"> Title </label>
                        <div className="input-group w-auto">
                            <span className="input-group-text">
                                <span className="icon-[tabler--heading] text-base-content/80 size-5"></span>
                            </span>
                            <input type="text" className="input grow" value={formData.title} onChange={onChangeField} id="title" name="title" />
                        </div>

                        <div className="w-auto">
                            <label className="label label-text" htmlFor="birthdate"> Date </label>
                            <div className="input-group w-auto">
                                <span className="input-group-text">
                                    <span className="icon-[tabler--cake] text-base-content/80 size-5"></span>
                                </span>
                                <input type="date" className="input grow disabled" id="date" value={formData.date} onChange={onChangeField} />
                            </div>
                        </div>

                        <div className="auto">
                            <label className="label label-text" htmlFor="description"> Description </label>
                            <div className="input-group w-auto  align-text-top">
                                <span className="input-group-text align-text-top">
                                    <span className="icon-[tabler--text-spellcheck] text-base-content/80 size-5"></span>
                                </span>
                                <textarea className="textarea max-w-sm" value={formData.description} onChange={onChangeField} rows={8} id="description" name="description" aria-label="Textarea" ></textarea>
                            </div>
                        </div>

                        <div className="w-auto my-3">
                            <button type="submit" className={`btn btn-block bg-black text-white hover:bg-black ${isLoading && 'btn-disabled'}`}>
                                {isLoading && <span className="loading loading-spinner loading-sm"></span>}
                                <span>{method === Method.PUT ? 'Actualizar' : method === Method.POST ? 'Registrar' : ''}</span>
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </>
    )
}


const getTodayDate = () : string => {
    const date = new Date();
    const y = date.getFullYear();
    const m = date.getMonth()+1;
    const d = date.getDay()+1;

    return `${y}-${m<10? '0'+m : m}-${d<10? '0'+d : d}`;
}

export default FormActivity
