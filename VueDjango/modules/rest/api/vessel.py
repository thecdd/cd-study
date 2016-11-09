from modules.rest.api.service.vessel import VesselService
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


class VesselList(APIView):
    service = VesselService()

    '''
    List all vessel
    '''

    def get(self, request, *args, **kwargs):
        return Response(self.service.get_all())

    '''
    Save all vessel
    '''

    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)


class VesselDetail(APIView):
    service = VesselService()

    '''
    Get vessel detail
    '''

    def get(self, request, *args, **kwargs):
        return Response({})

    '''
    Update vessel detail
    '''

    def put(self, request, *args, **kwargs):
        return Response({})

    '''
    Delete vessel detail
    '''

    def delete(self, request, *args, **kwargs):
        return Response({})
