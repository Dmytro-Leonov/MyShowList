from django.urls import path
from .views import (
    ShowComments,
    CommentReplies,
    VoteComment,
    CommentCreate,
    CommentUpdateDestroy
)

urlpatterns = [
    path('for-show/<int:id>/', ShowComments.as_view(), name='Show Comments'),
    path('for-comment/<int:id>/', CommentReplies.as_view(), name='Comment Replies'),
    path('vote/', VoteComment.as_view(), name='Vote Comment'),
    path('', CommentCreate.as_view(), name='Create Comment'),
    path('comment/<int:id>/', CommentUpdateDestroy.as_view(), name='Comment Update Destroy'),
]
