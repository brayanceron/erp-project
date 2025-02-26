import { Navbar } from './Navbar';
import { NavLink } from 'react-router';

export function Sidebar() {
    const baseClass = "hover:bg-gray-800 focus:bg-purple-600 focus:text-white text-gray-400"
    const isActiveClass = " bg-purple-600 text-white"

    function setActive(isActive: boolean) { return isActive ? baseClass + isActiveClass : baseClass }

    return (
        <>
            <Navbar />
            <button type="button" className="btn btn-text max-sm:btn-square sm:hidden my-0" aria-haspopup="dialog" aria-expanded="false" aria-controls="logo-sidebar" data-overlay="#logo-sidebar" >
                <span className="icon-[tabler--menu-2] size-5"></span>
            </button>

            <aside id="logo-sidebar" className="overlay bg-gradient-to-r from-gray-950 to-gray-900 sm:shadow-none overlay-open:translate-x-0 drawer drawer-start hidden max-w-64 sm:flex sm:translate-x-0" role="dialog" /* tabindex="-1" */ >

                <div className="drawer-header">
                    <div className="flex items-center gap-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M17.6745 16.9224L12.6233 10.378C12.2167 9.85117 11.4185 9.8611 11.0251 10.3979L6.45728 16.631C6.26893 16.888 5.96935 17.0398 5.65069 17.0398H3.79114C2.9635 17.0398 2.49412 16.0919 2.99583 15.4336L11.0224 4.90319C11.4206 4.38084 12.2056 4.37762 12.608 4.89668L20.9829 15.6987C21.4923 16.3558 21.024 17.3114 20.1926 17.3114H18.4661C18.1562 17.3114 17.8638 17.1677 17.6745 16.9224ZM12.5866 15.5924L14.8956 18.3593C15.439 19.0105 14.976 20 14.1278 20H9.74075C8.9164 20 8.4461 19.0586 8.94116 18.3994L11.0192 15.6325C11.4065 15.1169 12.1734 15.0972 12.5866 15.5924Z" fill="oklch(var(--p))" /></svg>
                        <h3 className="drawer-title text-xl font-semibold text-gray-50">FlyonUI</h3>
                    </div>
                </div>

                <div className="drawer-body px-2 ">
                    <ul className="menu p-0 bg-gradient-to-r from-gray-950 to-gray-900 ">

                        <li>
                            <NavLink to={"/"} className={({ isActive }) => setActive(isActive)}>
                                <span className="icon-[tabler--home] size-5"></span>Home
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/sucursal/get"} className={({ isActive }) => setActive(isActive)}>
                                <span className="icon-[tabler--building-factory-2] size-5"></span>Sucursales
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/departamento"} className={({ isActive }) => setActive(isActive)}>
                                <span className="icon-[tabler--puzzle] size-5"></span>Departamentos
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/usuario/get/id"} className={({ isActive }) => setActive(isActive)}>
                                <span className="icon-[tabler--user] size-5"></span>Usuarios
                            </NavLink>
                        </li>

                        <li>
                            <NavLink to={"/actividades"} className={({ isActive }) => setActive(isActive)}>
                                <span className="icon-[tabler--activity] size-5"></span>Actividades
                            </NavLink>
                        </li>

                        <li className="space-y-0.5 text-gray-400">
                            <a className="collapse-toggle collapse-open:bg-base-content/10" id="menu-app" data-collapse="#menu-app-collapse">
                                <span className="icon-[tabler--apps] size-5"></span>
                                Apps
                                <span className="icon-[tabler--chevron-down] collapse-open:rotate-180 size-4 transition-all duration-300"></span>
                            </a>
                            <ul id="menu-app-collapse" className="collapse hidden w-auto overflow-hidden transition-[height] duration-300" aria-labelledby="menu-app" >
                                <li>
                                    <a href=""   >
                                        <span className="icon-[tabler--message] size-5"></span>
                                        Chat
                                    </a>
                                </li>
                                <li>
                                    <a href=""  >
                                        <span className="icon-[tabler--calendar] size-5"></span>
                                        Calendario
                                    </a>
                                </li>
                            </ul>
                        </li>

                        <li className="">
                            <a href=""  >
                                <span className="icon-[tabler--shopping-bag] size-5"></span>
                                Productos
                            </a>
                        </li>

                    </ul>

                </div>
            </aside>
        </>
    )

}