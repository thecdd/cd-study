from django.http import HttpResponseServerError
from django.http.request import HttpRequest


class IPPermissionRequired:
    def __call__(self, fn):
        def wapper(*args, **kwargs):
            request = None
            for arg in args:
                if isinstance(arg, HttpRequest):
                    request = arg

            is_correct_visit = True
            content_type = 'application/json'

            if request is not None:
                path = request.path
                ip = request.META.get('REMOTE_ADDR')

            if is_correct_visit:
                return fn(*args, **kwargs)
            else:
                return HttpResponseServerError(content_type=content_type)

        return wapper
