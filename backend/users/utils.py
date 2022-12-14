import requests
from django.conf import settings
from django.core.exceptions import ValidationError
from django.core import files
from django.core.files.base import ContentFile

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/tokeninfo'


def google_parse_id_token(*, id_token: str) -> dict:
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        params={'id_token': id_token}
    )

    if not response.ok:
        raise ValidationError('id_token is invalid.')

    response_json = response.json()
    audience = response_json['aud']

    if audience != settings.GOOGLE_OAUTH2_CLIENT_ID:
        raise ValidationError('Invalid audience.')

    user = {
        'full_name': response_json['name'],
        'email': response_json['email'],
        'picture': response_json['picture']
    }
    return user


def download_user_picture(*, url: str) -> files.File:
    response = requests.get(url)
    picture = ''
    if response.ok:
        picture = files.File(ContentFile(response.content), 'picture.png')
    return picture
