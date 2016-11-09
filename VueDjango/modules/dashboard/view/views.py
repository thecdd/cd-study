from core.tool.view_helper import render_view

BASE_TEMPLATE_PATH = 'dashboard/app/'


def view_main(request, *arg, **dir):
    return render_view(request, BASE_TEMPLATE_PATH + '/main/main.html')
