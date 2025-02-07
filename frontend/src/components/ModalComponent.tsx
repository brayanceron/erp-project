import { HSOverlay } from "flyonui/flyonui"

export function ModalComponent({ title = "Title",  message, id ,  size= '' } : {title? : string, message : string, id :string, size? :string}) {
    size = `modal-dialog${size? '-'+size :""}`
    

    return (
        <>
            {/* <button className="btn btn-primary" onClick={abrir}>abrir</button> */}

            <div id={id} className="overlay modal overlay-open:opacity-100 modal-middle hidden" role="dialog" >
                <div className={"modal-dialog overlay-open:opacity-100 "+size}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="modal-title">{title}</h3>
                            <button type="button" className="btn btn-text btn-circle btn-sm absolute end-3 top-3" aria-label="Close" data-overlay={"#"+id}>
                                <span className="icon-[tabler--x] size-4"></span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {message}
                        </div>
                        <div className="modal-footer">
                            {/* <button type="button" className="btn btn-soft btn-secondary" data-overlay="#middle-center-modal">Close</button> */}
                            <button type="button" className="btn btn-soft btn-secondary" data-overlay={"#"+id}>Close</button>
                            <button type="button" className="btn bg-black hover:bg-black text-white">Accept</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}

export function openModal(event : any, id : string){
    event
    HSOverlay.open(`#${id}`)
    // let idd  = document.querySelector('#'+id) 
    // const h = document.createElement('a')
    // if(!idd) return
    // modal.open()
}
export function closeModal(event : any, id :string){
    event
    HSOverlay.close(`#${id}`)
}