import { useEffect, useState } from "react"

export function AlertComponent({ message, initialHidden="hidden" }: { message: string, initialHidden? : string}) {
    initialHidden = [''," ","hidden"].includes(initialHidden)? initialHidden : "hidden"
    const [hidden, setHidden] = useState(initialHidden)

    useEffect(() => {
        if (message) setHidden(' ')
    }, [message])

    const msA = message ? message.toString() : " "
    return (
        <>
            <div className={`alert alert-soft alert-error removing:translate-x-5 removing:opacity-0 flex items-center gap-4 transition duration-300 ease-in-out ${hidden}`} role="alert" id="dismiss-alert1">

                <span className="icon-[tabler--alert-circle-filled] size-6"></span>
                <p><span className="text-lg font-semibold">Error alert : </span>{msA}</p>
                <button className="ms-auto leading-none" aria-label="Close Button"
                    data-remove-element = "#dismiss-alert1"
                    onClick={ _ => setHidden('hidden') }
                >
                    <span className="icon-[tabler--x] size-5"></span>
                </button>
            </div>
        </>
    )

}
