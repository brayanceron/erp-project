export function Navbar() {
    return (
        < nav className="navbar rounded-box justify-between gap-4 shadow ml-64 w-auto" >
            <div className="navbar-start">
                <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:9]">
                    <button id="dropdown-name" type="button" className="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 dropdown-open:text-base-content" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <span className="icon-[tabler--menu-2] size-5"></span>
                    </button>
                    <ul className="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-name">
                        <li><a className="dropdown-item" href="#">Link 1</a></li>
                        <li><a className="dropdown-item" href="#">Link 2</a></li>
                        <li><a className="dropdown-item" href="#">Link 3</a></li>
                        <hr className="border-base-content/25 -mx-2 my-3" />
                        <li><a className="dropdown-item" href="#">Link 4</a></li>
                    </ul>
                </div>
            </div>
            <div className="navbar-center flex items-center">
                <a className="link text-base-content link-neutral text-xl font-semibold no-underline" href="#">
                    FlyonUI
                </a>
            </div>
            <div className="navbar-end items-center gap-4">
                <button className="btn btn-sm btn-text btn-circle size-[2.125rem]" aria-label="Search Button">
                    <span className="icon-[tabler--search] size-[1.375rem]"></span>
                </button>
                <div className="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                    <button id="dropdown-scrollable" type="button" className="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                        <div className="avatar">
                            <div className="size-9.5 rounded-full">
                                <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                            </div>
                        </div>
                    </button>
                    <ul className="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
                        <li className="dropdown-header gap-2">
                            <div className="avatar">
                                <div className="w-10 rounded-full">
                                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
                                </div>
                            </div>
                            <div>
                                <h6 className="text-base-content text-base font-semibold">John Doe</h6>
                                <small className="text-base-content/50">Admin</small>
                            </div>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                <span className="icon-[tabler--user]"></span>
                                My Profile
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                <span className="icon-[tabler--settings]"></span>
                                Settings
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                <span className="icon-[tabler--receipt-rupee]"></span>
                                Billing
                            </a>
                        </li>
                        <li>
                            <a className="dropdown-item" href="#">
                                <span className="icon-[tabler--help-triangle]"></span>
                                FAQs
                            </a>
                        </li>
                        <li className="dropdown-footer gap-2">
                            <a className="btn btn-error btn-soft btn-block" href="#">
                                <span className="icon-[tabler--logout]"></span>
                                Sign out
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav >
    )
}


{/* <nav classNameName="navbar bg-base-100 max-sm:rounded-box max-sm:shadow sm:border-b border-base-content/25 sm:z-[1] relative p-0 ml-64 w-auto">
                <button type="button" classNameName="btn btn-text max-sm:btn-square sm:hidden me-2" aria-haspopup="dialog" aria-expanded="false" aria-controls="default-sidebar" data-overlay="#default-sidebar" >
                    <span classNameName="icon-[tabler--menu-2] size-5"></span>
                </button>
                <div classNameName="flex flex-1 items-center">
                    <a classNameName="link text-base-content link-neutral text-xl font-semibold no-underline" href="#">
                        FlyonUI
                    </a>
                </div>
                <div classNameName="navbar-end flex items-center gap-4">
                    <div classNameName="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                        <button id="dropdown-scrollable" type="button" classNameName="dropdown-toggle btn btn-text btn-circle dropdown-open:bg-base-content/10 size-10" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            <div classNameName="indicator">
                                <span classNameName="indicator-item bg-error size-2 rounded-full"></span>
                                <span classNameName="icon-[tabler--bell] text-base-content size-[1.375rem]"></span>
                            </div>
                        </button>
                        <div classNameName="dropdown-menu dropdown-open:opacity-100 hidden" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-scrollable">
                            <div classNameName="dropdown-header justify-center">
                                <h6 classNameName="text-base-content text-base">Notifications</h6>
                            </div>
                            <div classNameName="vertical-scrollbar horizontal-scrollbar rounded-scrollbar text-base-content/80 max-h-56 overflow-auto max-md:max-w-60">
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar away-bottom">
                                        <div classNameName="w-10 rounded-full">
                                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">Charles Franklin</h6>
                                        <small classNameName="text-base-content/50 truncate">Accepted your connection</small>
                                    </div>
                                </div>
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar">
                                        <div classNameName="w-10 rounded-full">
                                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png" alt="avatar 2" />
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">Martian added moved Charts & Maps task to the done board.</h6>
                                        <small classNameName="text-base-content/50 truncate">Today 10:00 AM</small>
                                    </div>
                                </div>
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar online-bottom">
                                        <div classNameName="w-10 rounded-full">
                                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-8.png" alt="avatar 8" />
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">New Message</h6>
                                        <small classNameName="text-base-content/50 truncate">You have new message from Natalie</small>
                                    </div>
                                </div>
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar placeholder">
                                        <div classNameName="bg-neutral text-neutral-content w-10 rounded-full p-2">
                                            <span classNameName="icon-[tabler--user] size-full"></span>
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">Application has been approved 🚀</h6>
                                        <small classNameName="text-base-content/50 text-wrap">Your ABC project application has been approved.</small>
                                    </div>
                                </div>
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar">
                                        <div classNameName="w-10 rounded-full">
                                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-10.png" alt="avatar 10" />
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">New message from Jane</h6>
                                        <small classNameName="text-base-content/50 text-wrap">Your have new message from Jane</small>
                                    </div>
                                </div>
                                <div classNameName="dropdown-item">
                                    <div classNameName="avatar">
                                        <div classNameName="w-10 rounded-full">
                                            <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-3.png" alt="avatar 3" />
                                        </div>
                                    </div>
                                    <div classNameName="w-60">
                                        <h6 classNameName="truncate text-base">Barry Commented on App review task.</h6>
                                        <small classNameName="text-base-content/50 truncate">Today 8:32 AM</small>
                                    </div>
                                </div>
                            </div>
                            <a href="#" classNameName="dropdown-footer justify-center gap-1">
                                <span classNameName="icon-[tabler--eye] size-4"></span>
                                View all
                            </a>
                        </div>
                    </div>
                    <div classNameName="dropdown relative inline-flex [--auto-close:inside] [--offset:8] [--placement:bottom-end]">
                        <button id="dropdown-scrollable" type="button" classNameName="dropdown-toggle flex items-center" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                            <div classNameName="avatar">
                                <div classNameName="size-9.5 rounded-full">
                                    <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar 1" />
                                </div>
                            </div>
                        </button>
                        <ul classNameName="dropdown-menu dropdown-open:opacity-100 hidden min-w-60" role="menu" aria-orientation="vertical" aria-labelledby="dropdown-avatar">
                            <li classNameName="dropdown-header gap-2">
                                <div classNameName="avatar">
                                    <div classNameName="w-10 rounded-full">
                                        <img src="https://cdn.flyonui.com/fy-assets/avatar/avatar-1.png" alt="avatar" />
                                    </div>
                                </div>
                                <div>
                                    <h6 classNameName="text-base-content text-base font-semibold">John Doe</h6>
                                    <small classNameName="text-base-content/50">Admin</small>
                                </div>
                            </li>
                            <li>
                                <a classNameName="dropdown-item" href="#">
                                    <span classNameName="icon-[tabler--user]"></span>
                                    My Profile
                                </a>
                            </li>
                            <li>
                                <a classNameName="dropdown-item" href="#">
                                    <span classNameName="icon-[tabler--settings]"></span>
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a classNameName="dropdown-item" href="#">
                                    <span classNameName="icon-[tabler--receipt-rupee]"></span>
                                    Billing
                                </a>
                            </li>
                            <li>
                                <a classNameName="dropdown-item" href="#">
                                    <span classNameName="icon-[tabler--help-triangle]"></span>
                                    FAQs
                                </a>
                            </li>
                            <li classNameName="dropdown-footer gap-2">
                                <a classNameName="btn btn-error btn-soft btn-block" href="#">
                                    <span classNameName="icon-[tabler--logout]"></span>
                                    Sign out
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav> */}