from flask import Blueprint, request, render_template, redirect
import src.controllers.auth

auth_router = Blueprint('auth_router', __name__)

@auth_router.route('/login')
def login() :#{
    
    # if (request.cookies.get('session')) : return redirect('/ssr/auth/logout')
    
    # _ , status_logged = src.controllers.auth.is_allow('/ssr/auth/login', ['/ssr/auth/login'])
    _ , status = src.controllers.auth.is_logged()
    if (status == 200) : return redirect('/ssr/sucursal/')
    
    error = request.args.get('error') or False
    return render_template('auth/login.html', error = error)
#}

@auth_router.route('/logout')
def logout() :#{
    src.controllers.auth.logout()
    return redirect("/ssr/auth/login")
#}



@auth_router.route('/login', methods = ['POST'])
def login_post() :#{
    email = request.form.get('email')
    password = request.form.get('password')

    res, status = src.controllers.auth.login(email, password)
    if (status != 200) :#{
        return redirect(f"/ssr/auth/login?error={ res.get('message') }")
    #}

    return redirect('/ssr/sucursal')
    # return f"Iniciando sesion para {email}, {password}"
#}
