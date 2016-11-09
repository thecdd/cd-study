from django.shortcuts import render

BASE_TEMPLATE_PATH = 'index/app/'


def view_index(request, *arg, **dir):
    return render(request, BASE_TEMPLATE_PATH + 'index/index.html')
