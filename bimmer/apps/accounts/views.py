from rest_framework import status
from rest_framework.response import Response

from .serializers import UserRegistrationSerializer, UserSerializer


def register_user(request):
    """TODO"""

    serializer = UserRegistrationSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = serializer.save()
    user_data = UserSerializer(user).data

    return Response(
        {
            "message": "User registered successfully.",
            "user": user_data,
        },
        status=status.HTTP_201_CREATED,
    )
