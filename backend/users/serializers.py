from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    delete_picture = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = (
            'id',
            'full_name',
            'email',
            'picture',
            'delete_picture'
        )
