from rest_framework import serializers

from comments.models import (
    Comment,
    CommentVote
)
from users.models import User


class CommentUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            'id',
            'full_name',
            'picture'
        )


class CommentSerializer(serializers.ModelSerializer):
    replies_count = serializers.IntegerField(allow_null=True)
    user = CommentUserSerializer()
    reply_to_user = CommentUserSerializer()
    user_vote = serializers.IntegerField(allow_null=True)

    class Meta:
        model = Comment
        fields = (
            "id",
            'date_created',
            'text',
            'likes',
            'user',
            'parent_comment',
            'reply_to_user',
            'replies_count',
            'user_vote'
        )


class LikeCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentVote
        fields = (
            'comment',
            'vote'
        )


class DeleteCommentVoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentVote
        fields = ('comment',)


class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = (
            'show',
            'parent_comment',
            'reply_to_user',
            'text'
        )


class CommentUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('text',)
