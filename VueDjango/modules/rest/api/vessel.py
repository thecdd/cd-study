from rest_framework.views import APIView
from rest_framework import status
from core.tool.view_helper import render_api
from modules.rest.api.service.vessel import VesselService


class VesselList(APIView):
    service = VesselService()

    '''
    List all vessel
    '''

    def get(self, request, *args, **kwargs):
        return render_api(self.service.get_all())

    '''
    Create a vessel
    '''

    def post(self, request, *args, **kwargs):
        data = request.data

        result = {}

        if self.service.valid(data):
            self.service.save(data)
            result['key'] = 'success'
            status_code = status.HTTP_200_OK
        else:
            result['key'] = 'failed'
            status_code = status.HTTP_400_BAD_REQUEST

        return render_api(result, resp_status=status_code)


class VesselDetail(APIView):
    service = VesselService()

    '''
    Get vessel detail
    '''

    def get(self, request, *args, **kwargs):
        imo = kwargs.get('imo')
        info = self.service.get_by(imo=imo)
        if info is not None:
            return render_api(info, resp_status=status.HTTP_200_OK)
        else:
            return render_api({}, resp_status=status.HTTP_404_NOT_FOUND)

    '''
    Update vessel detail
    '''

    def put(self, request, *args, **kwargs):
        imo = kwargs.get('imo')
        data = request.data
        result = self.service.update_by(imo=imo, data=data)
        if result:
            return render_api({}, resp_status=status.HTTP_200_OK)
        else:
            return render_api({}, resp_status=status.HTTP_404_NOT_FOUND)

    '''
    Delete vessel detail
    '''

    def delete(self, request, *args, **kwargs):
        imo = kwargs.get('imo')
        result = self.service.delete_by(imo=imo)
        if result:
            return render_api({}, resp_status=status.HTTP_200_OK)
        else:
            return render_api({}, resp_status=status.HTTP_404_NOT_FOUND)
