def params_pagination_check(page : int = 0, pagination_size : int =0) :#{
    if (not str(page).isnumeric() or not str(pagination_size).isnumeric()) : return False
    if (int(page) < 0 or int(pagination_size) < 1) : return False
    return True
#}