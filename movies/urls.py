from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("register", views.register, name="register"),
    path("logout", views.logout_view, name="logout"),
    path("movie/<int:movie>", views.movie_info, name="movie"),
    path("profile/<str:username>", views.profile, name="profile"),
    path("moviesland", views.moviesland, name="moviesland"),
    path("watchlists/<str:username>", views.watchlists, name="watchlists"),
    path("watchlist/<int:watchlist_id>", views.watchlist, name="watchlist"),

     # API ROUTE 
    path("new_movie/", views.new_movie, name="new_movie"),
    path("edit/", views.edit, name="edit"),
    path("rate_movie/", views.rate_movie, name="rate_movie"),
    path("delete/", views.delete, name="delete"),
    path("add_movie/", views.add_movie, name="add_movie"),
    path("delete_list/", views.delete_list, name="delete_list"),
    path("delete_item/", views.delete_item, name="delete_item")
]