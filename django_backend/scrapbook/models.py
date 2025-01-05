from django.db import models
from django.conf import settings

class Album(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        # album names need to be unique for a user, but other accounts can use the same name.
        unique_together = ("user", "name") 

    def __str__(self):
        return f' {self.id} Album {self.name}: Created by {self.user} at {self.date_created}'   



