from django.shortcuts import render


def view_main(request, *arg, **dir):
    return render(request, 'main/main.html')
