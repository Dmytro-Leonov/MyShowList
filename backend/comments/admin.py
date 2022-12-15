from django.contrib import admin
from .models.comment import Comment
from .models.comment_vote import CommentVote

admin.site.register(Comment)
admin.site.register(CommentVote)
