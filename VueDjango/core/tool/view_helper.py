from django.shortcuts import render
from VueDjango.env import SITE_CONFIG


def get_common_template_context(extra_context=None):
    base_context = {
        'BASE_URL_PATH': SITE_CONFIG.get('base_url'),
        'STATIC_URL_PATH': SITE_CONFIG.get('static_url')
    }
    if extra_context is not None:
        base_context.update(extra_context)

    return base_context


def render_view(request, template_path, context=None):
    view_context = get_common_template_context()
    if context is not None:
        view_context.update(context)
    return render(request, template_path, view_context)
