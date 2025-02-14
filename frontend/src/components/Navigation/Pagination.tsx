export function Pagination() {
    return (
        <nav className="flex items-center gap-x-1">
            <button type="button" className="btn btn-circle bg-black text-white rounded-full hover:bg-gray-800">
                <span className="icon-[tabler--caret-left]"></span>
            </button>
            <div className="flex items-center gap-x-1">
                <button type="button" className="btn btn-outline btn-circle aria-[current='page']:text-bg-soft-primary">1</button>
                {/* <button type="button" className="btn btn-outline btn-circle aria-[current='page']:text-bg-soft-primary" aria-current="page">2</button> */}
                <button type="button" className="btn btn-outline btn-circle aria-[current='page']:bg-black aria-[current='page']:text-white" aria-current="page">2</button>
                <button type="button" className="btn btn-outline btn-circle aria-[current='page']:text-bg-soft-primary">3</button>
            </div>

            <button type="button" className="btn btn-circle bg-black text-white rounded-full hover:bg-gray-800">
                <span className="icon-[tabler--caret-right]"></span>
            </button>
        </nav>
    )
}