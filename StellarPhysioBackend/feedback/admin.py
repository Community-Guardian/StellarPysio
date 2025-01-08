# feedback/admin.py
from django.contrib import admin
from .models import Feedback

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('user', 'rating', 'created_at', 'short_feedback')
    list_filter = ('rating', 'created_at')  # Filters for ratings and creation date
    search_fields = ('user__username', 'feedback')  # Search by user username and feedback content
    ordering = ('-created_at',)  # Order by most recent feedback first
    list_per_page = 20  # Display 20 feedbacks per page

    def short_feedback(self, obj):
        """Truncate long feedback for better readability in the list display."""
        return obj.feedback[:50] + ('...' if len(obj.feedback) > 50 else '')
    short_feedback.short_description = 'Feedback'  # Label for the column
