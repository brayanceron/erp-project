export function ItemInfo({ icon, text, classContainer = "" }: { icon: string, text: string, classContainer?: string }) {
    return (
        <div className={`w-auto m-0 ${classContainer}`}>
            <div className="flex w-full m-0 p-0 items-start justify-start">
                <span className={`icon-[tabler--${icon}] m-0 p-0 mr-1`}></span>
                <p className="m-0 p-0">{text}</p>
            </div>
        </div>
    )
}