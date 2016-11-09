"""VueDjango URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
import modules.free_map.view.views
import modules.free_map.api.profile

view = [
    url(r'^main/', modules.free_map.view.views.view_main),
]

api = [
    url(r'^api/store/', modules.free_map.api.profile.store_profile)
]

urlpatterns = []
urlpatterns.extend(view)
urlpatterns.extend(api)
