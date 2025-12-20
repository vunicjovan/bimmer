import os
import platform
import sys

from django.http import HttpRequest, JsonResponse
from django.utils import timezone


def health_check(request: HttpRequest) -> JsonResponse:
    data = {
        "status": "ok",
        "timestamp": timezone.now().isoformat(),
        "python": {
            "version": sys.version.split()[0],
            "implementation": platform.python_implementation(),
        },
        "system": {
            "os": os.name,
            "platform": platform.system(),
            "platform_release": platform.release(),
            "architecture": platform.machine(),
            "cpu_count": os.cpu_count(),
        },
    }

    return JsonResponse(data)
