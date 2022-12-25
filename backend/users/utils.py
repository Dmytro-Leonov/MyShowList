import requests
from django.core import files
from django.core.files.base import ContentFile

GOOGLE_ID_TOKEN_INFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'


def google_parse_id_token(*, access_token: str) -> tuple[dict, bool]:
    response = requests.get(
        GOOGLE_ID_TOKEN_INFO_URL,
        headers={"Authorization": f'Bearer {access_token}'}
    )
    is_valid = True
    if not response.ok:
        return {}, False

    response_json = response.json()

    user = {
        'full_name': response_json['name'],
        'email': response_json['email'],
        'picture': response_json['picture']
    }
    return user, is_valid


def download_user_picture(*, url: str) -> files.File:
    response = requests.get(url)
    picture = ''
    if response.ok:
        picture = files.File(ContentFile(response.content), 'picture.png')
    return picture
