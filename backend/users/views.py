from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework import (
    status,
    generics
)

from knox.models import AuthToken

from .utils import google_parse_id_token, download_user_picture

from .models import User

from .serializers import UserSerializer


class GoogleAuth(APIView):
    def post(self, request, *args, **kwargs):
        access_token = request.headers.get('Authorization')
        user, is_valid = google_parse_id_token(access_token=access_token)

        if not is_valid:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        picture_url = user.pop('picture')
        user_in_db, created = User.objects.get_or_create(**user)
        if created:
            picture = download_user_picture(url=picture_url)
            user_in_db.picture.save(name=picture.name, content=picture)

        data = {'token': AuthToken.objects.create(user_in_db)[1]}
        return Response(data=data, status=status.HTTP_202_ACCEPTED)


class CurrentUserView(generics.RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    parser_classes = [MultiPartParser]

    def get_object(self):
        return self.request.user

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user

        if serializer.validated_data.pop('delete_image'):
            user.picture.delete()

        picture = serializer.validated_data.pop('picture', None)
        if picture:
            user.picture = picture

        for attr, val in serializer.validated_data.items():
            setattr(user, attr, val)

        user.save()

        response = {'data': 'Profile updated successfully.'}
        return Response(data=response, status=status.HTTP_200_OK)
