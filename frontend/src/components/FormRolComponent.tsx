import { UsePostForm } from "../hooks/usePostForm";
import { Method } from "../utils/Methods";

type FormRol = {
    id : string,
    name : string,
    description : string,
}

const FormRolComponent = ({ defaultValues, url, method = Method.POST} : { defaultValues? : FormRol, url : string, method? : Method } ) => {
    const { formData, onSubmitForm, isLoadingPostReq : isLoading, onChangeField } = UsePostForm( defaultValues, url, method, '/rol/get/');

    return (
        <div className="container card p-7 m-3 sm:w-full md:w-[55%] lg:w-[55%] xl:w-[38%] max-w-[650px]">
            <form action="" onSubmit={ onSubmitForm }>

            <h3 className="text-2xl font-bold text-center">{method === Method.PUT ? 'Actualizar' : method === Method.POST ? 'Registrar' : ''}</h3>

                <div className="w-auto">
                    <label className="label label-text" htmlFor="surnames"> Name </label>
                    <div className="input-group w-auto">
                        <span className="input-group-text">
                            <span className="icon-[tabler--text-size] text-base-content/80 size-5"></span>
                        </span>
                        <input type="text" className="input grow" id="name" value={formData.name} onChange={onChangeField} />
                    </div>
                </div>

                <div className="auto">
                    <label className="label label-text" htmlFor="description"> Description of role </label>
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

            </form>
        </div>
    )
}

export default FormRolComponent
