from rest_framework import (
    status,
    generics
)
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.views import APIView
from knox.models import AuthToken

from .utils import google_parse_id_token, download_user_picture

from .models import User
from .serializers import UserSerializer


class GoogleAuth(APIView):
    def post(self, request, *args, **kwargs):
        id_token = request.headers.get('Authorization')
        user = google_parse_id_token(id_token=id_token)
        picture_url = user.pop('picture')
        user_in_db, created = User.objects.get_or_create(**user)
        if created:
            picture = download_user_picture(url=picture_url)
            user_in_db.picture.save(name=picture.name, content=picture)
        data = {'token': AuthToken.objects.create(user_in_db)[1]}
        print(data)
        response = Response(data=data, status=status.HTTP_200_OK)
        return response


class CurrentUserView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_object(self):
        return self.request.user
