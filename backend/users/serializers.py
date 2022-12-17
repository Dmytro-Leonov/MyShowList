from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(read_only=True)
    delete_image = serializers.BooleanField(write_only=True)

    class Meta:
        model = User
        fields = (
            'full_name',
            'email',
            'picture',
            'delete_image'
        )
