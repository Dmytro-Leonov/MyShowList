from django.shortcuts import get_object_or_404

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import (
    generics,
    status,
    permissions
)

from comments.filters import CommentFilter
from comments.models import (
    Comment,
    CommentVote
)
from comments.serializers import (
    CommentSerializer,
    LikeCommentSerializer,
    DeleteCommentVoteSerializer,
    CommentCreateSerializer,
    CommentUpdateSerializer
)
from core.permissions import IsCommentOwner


class ShowComments(generics.ListAPIView):
    serializer_class = CommentSerializer
    filterset_class = CommentFilter

    def get_queryset(self):
        comments = (
            Comment
            .objects
            .detailed_info_with_replies_count(
                show_id=self.kwargs.get('id'),
                user=self.request.user
            )
        )
        return comments


class CommentReplies(generics.ListAPIView):
    serializer_class = CommentSerializer

    def get_queryset(self):
        comments = (
            Comment
            .objects
            .detailed_info_with_replies_count(
                user=self.request.user,
                parent_comment_id=self.kwargs.get('id')
            )
        )
        return comments


class CommentUpdateDestroy(APIView):
    permission_classes = [permissions.IsAuthenticated, IsCommentOwner]

    def post(self, request, *args, **kwargs):
        comment = get_object_or_404(Comment, id=self.kwargs.get('id'))
        self.check_object_permissions(request, comment)

        serializer = CommentUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        comment.text = serializer.validated_data.pop('text')
        comment.save()

        response = CommentSerializer(comment).data
        return Response(data=response, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        comment = get_object_or_404(Comment, id=self.kwargs.get('id'))
        self.check_object_permissions(request, comment)
        comment.delete()
        response = {'data': 'Comment was deleted successfully.'}
        return Response(data=response, status=status.HTTP_204_NO_CONTENT)


class CommentCreate(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = CommentCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment = Comment.objects.create(
            user=self.request.user,
            **serializer.validated_data
        )
        response = CommentSerializer(comment).data
        return Response(data=response, status=status.HTTP_201_CREATED)


class VoteComment(generics.GenericAPIView):
    permission_classes = [permissions.IsAuthenticated]

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return LikeCommentSerializer
        if self.request.method == 'DELETE':
            return DeleteCommentVoteSerializer
        return LikeCommentSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)

        serializer.is_valid(raise_exception=True)
        CommentVote.objects.update_or_create(
            user=self.request.user,
            **serializer.validated_data
        )
        response = {'data': 'Your vote was recorded successfully.'}
        return Response(data=response, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        serializer = self.get_serializer_class()(data=request.data)
        serializer.is_valid(raise_exception=True)
        comment_vote = get_object_or_404(
            CommentVote,
            user=self.request.user,
            **serializer.validated_data
        )
        comment_vote.delete()
        return Response()
