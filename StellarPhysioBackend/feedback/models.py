from django.db import models
from django.conf import settings  # For custom user model

class Feedback(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='feedbacks')  # Using the custom user model
    feedback = models.TextField()
    rating = models.IntegerField(choices=[(i, f"{i} Star") for i in range(1, 6)], default=5)  # Star ratings (1 to 5)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Feedback from {self.user.username} ({self.rating} Stars) at {self.created_at}"
