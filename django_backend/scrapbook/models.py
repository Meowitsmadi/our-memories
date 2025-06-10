from django.db import models
from django.conf import settings
from django.utils.translation import gettext_lazy as _

class Album(models.Model):
    name = models.CharField(max_length=100)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    cover_img = models.ImageField(upload_to='album_covers/', blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)

    class Meta:
        # album names need to be unique for a user, but other accounts can use the same name.
        unique_together = ("user", "name") 

    def __str__(self):
        return f' ID {self.id}, Album {self.name}: Created by {self.user} at {self.date_created}'

class Page(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="pages")
    name = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)
    order = models.PositiveIntegerField()

    class Meta:
        unique_together = ('album', 'order')
        ordering = ["order"] # use order as the default ordering for the object

    def __str__(self):
        return f' ID: {self.id}, Page {self.order} {self.name} in Album "{self.album.name}"'    

class Media(models.Model):
    class MediaType(models.TextChoices):
        IMAGE = "IMG", _("Image")
        TEXT = "TXT", _("Text") 
        STICKER = "STCKR", _("Sticker") 

    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name="media", null=True, blank=True)
    page = models.ForeignKey(Page, on_delete=models.CASCADE, related_name="media")
    type = models.CharField(max_length=5, choices=MediaType)
    content = models.CharField(max_length=150)
    # position = 
    date_created = models.DateTimeField(auto_now_add=True)
    # created_by = models.

    def __str__(self):
        return f'{self.page} contains media type: {self.type}, created on {self.date_created}'






