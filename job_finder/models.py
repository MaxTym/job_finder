from django.db import models

class Jobs(models.Model):
    position = models.CharField(max_length=250)
    link = models.CharField(max_length=250)
    location = models.CharField(max_length=250)
    comments = models.CharField(max_length=250, blank=True, null=True)
    applied = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
