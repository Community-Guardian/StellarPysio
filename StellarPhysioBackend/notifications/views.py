from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from .models import Notification
from .serializers import NotificationSerializer


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]
    queryset = Notification.objects.all()
    def get_queryset(self):
        # Return notifications for the authenticated user
        return Notification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user from the request
        serializer.save(user=self.request.user)

    def perform_update(self, serializer):
        # Ensure the user field is not altered during updates
        serializer.save(user=self.request.user)

    # Custom action to mark a specific notification as read
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        notification = self.get_object()
        notification.is_read = True
        notification.save()
        return Response({"status": "Notification marked as read"}, status=status.HTTP_200_OK)

    # Custom action to get unread notifications
    @action(detail=False, methods=['get'])
    def unread(self, request):
        unread_notifications = self.get_queryset().filter(is_read=False)
        serializer = self.get_serializer(unread_notifications, many=True)
        return Response(serializer.data)
