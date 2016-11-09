import json
from django.http.response import HttpResponse
from free_map.api.service.profile import ProfileService
from free_map.api.tool.response_helper import build_api_response
from core.enum.signal import ResponseSignal
from core.decorator.request import IPPermissionRequired


@IPPermissionRequired()
def store_profile(request, *arg, **dir):
    identification_id = request.POST.get('id')
    password = request.POST.get('psw')
    data = request.POST.get('data')
    key = request.POST.get('key')

    service_key = None
    response_key = None

    if identification_id is None \
            or password is None \
            or data is None \
            or key is None:
        response_key = ResponseSignal.DATA_MISSING
    else:
        profile_service = ProfileService()
        service_key = profile_service.store_profile(identification_id, password, data, key)

    result = build_api_response(service_key, response_key, '')
    return HttpResponse(json.dumps(result), content_type='application/json')
