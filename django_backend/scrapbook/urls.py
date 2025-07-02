from django.urls import path
from . import views

urlpatterns = [
     path('albums/create/', views.CreateAlbumView.as_view(), name ="create_album"),
     path('albums/display/', views.DisplayAlbumsView.as_view(), name="display_albums"),
     path('albums/<int:album_id>/update/', views.UpdateAlbumView.as_view(), name="update_album"),
     path('albums/<int:album_id>/pages/', views.DisplayPagesInAlbum.as_view(), name="display_pages"),
     path('albums/<int:album_id>/pages/<int:page_id>', views.DisplaySingularPageView.as_view(), name="display_single_page"),
     path('pages/create/', views.CreatePageView.as_view(), name="create_page"),
     path('albums/<int:album_id>/pages/<int:page_id>/media/create/', views.CreateMediaView.as_view(), name="create_media"),
     path('albums/<int:album_id>/pages/<int:page_id>/media/', views.DisplayMediaView.as_view(), name="display_media"),
     path('media/<int:media_id>/update/', views.UpdateMediaView.as_view(), name="update_media"),
     path('media/<int:media_id>/delete/', views.DeleteMediaView.as_view(), name="delete_media"),

]