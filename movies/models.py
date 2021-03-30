from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    pass

class Comments(models.Model):
    comment = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_comments")
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Comment by {self.user.username}"

class Rating(models.Model):
    rating = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_ratings", null=True)
    time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.rating}"


class Movie(models.Model):
    user = models.ManyToManyField(User, blank=True, related_name="user_movies")
    title = models.TextField()
    overview = models.TextField()
    poster = models.CharField(max_length=200, default=None,blank=True, null=True)
    movieID = models.CharField(max_length=200,blank=True, null=True)
    comments = models.ManyToManyField(Comments, blank=True, related_name="movie_comments")
    ratings = models.ManyToManyField(Rating, blank=True, related_name="movie_ratings")

    def __str__(self):
        return f"{self.title}"

class Watchlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="user_lists")
    watchlist = models.CharField(max_length=200)
    movie = models.ManyToManyField(Movie, blank=True, related_name="movie_list")

    def __str__(self):
        return f"{self.watchlist} by {self.user.username}"