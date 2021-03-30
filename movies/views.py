import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.core.paginator import Paginator
from django.utils import timezone
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Avg

from .models import *
from .forms import *


def index(request):
    return render(request, "movies/index.html")

def login_view(request):
    if request.method == "POST":
        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "movies/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "movies/login.html")

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "movies/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "movies/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))

    else:
        return render(request, "movies/register.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def movie_info(request, movie):
    movieInfo = Movie.objects.filter(movieID=movie).first()
    
    if request.user.is_authenticated and movieInfo is not None:
        watchlists = Watchlist.objects.filter(user=request.user)
        comments = movieInfo.comments.all()
        average = Movie.objects.filter(movieID=movie).aggregate(Avg('ratings__rating'))
        form = CommentForm(request.POST)
        if request.method == "POST":
            if form.is_valid():
                comment = form.save(commit=False)
                comment.user = request.user
                comment.save()
                movieInfo.comments.add(comment)
                comment.save()
                return render(request, "movies/movie.html", {
                    "movie": movie,
                    "movieInfo": movieInfo,
                    "comments": comments, 
                    "average": average,
                    "watchlists": watchlists
                })
    else:
        return render(request, "movies/movie.html", {
            "movie": movie,
            "movieInfo": movieInfo
        })

    return render(request, "movies/movie.html", {
            "movie": movie,
            "movieInfo": movieInfo,
            "form": form,
            "comments": comments,
            "average": average,
            "watchlists": watchlists
        })

@csrf_exempt
@login_required
def new_movie(request):
    user = User.objects.get(username=request.user)

    if request.method == "POST":
        movie_title = request.POST.get('title')
        movie_overview = request.POST.get('overview')
        movie_poster = request.POST.get('poster')
        movie_id = request.POST.get('movieID')
        movie_exist = Movie.objects.filter(movieID=movie_id).first()

        if movie_exist:
            if user in movie_exist.user.all():
                movie_exist.user.remove(user)
                movie_exist.save()
                return JsonResponse({'message': 'This movie was deleted from your database!', 'state': 'Save'}, status=201)
            
            else:
                movie_exist.user.add(user)
                movie_exist.save()
                return JsonResponse({'message': 'This movie was added from your database!', 'state': 'Delete'}, status=201)
        else: 
            try: 
                movie = Movie.objects.create(title=movie_title,overview=movie_overview,poster='https://image.tmdb.org/t/p/original' + movie_poster, movieID=movie_id)
                movie.user.add(user)
                movie.save()
                return JsonResponse({'message': 'This movie was correctly added to your database!', 'state': 'Delete'}, status=201)
            except: 
                return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)

@login_required
def profile(request, username):
    user = User.objects.get(username=username)
    movies = Movie.objects.filter(user=user)

    return render(request, "movies/profile.html", {
        "movies": movies
    })

@login_required
def watchlists(request, username):
    user = User.objects.get(username=username)
    watchlists = Watchlist.objects.filter(user=user)
    listform = WatchlistForm(request.POST)

    if request.method == "POST":
        if listform.is_valid():
            watchlist = listform.save(commit=False)
            watchlist.user = user
            watchlist.save()
            return render(request, "movies/watchlists.html", {
                "watchlists": watchlists,
                "listform": listform
            })

    return render(request, "movies/watchlists.html", {
        "watchlists": watchlists,
        "listform": listform
    })

@login_required
def watchlist(request, watchlist_id):
    watchlist = Watchlist.objects.get(id=watchlist_id)
    movies = watchlist.movie.all

    return render(request, "movies/watchlist.html", {
        "watchlist": watchlist, 
        "movies": movies
    })

@login_required
@csrf_exempt
def delete_item(request):
    user = User.objects.get(username=request.user)
    if request.method == "POST":
        try: 
            movieid = request.POST.get('movieid')
            listid = request.POST.get('listid')
            watchlist = Watchlist.objects.get(id=listid)
            watchlist.movie.remove(movieid)
            watchlist.save()
            return JsonResponse({}, status=201)
        except:
                return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)

@login_required
@csrf_exempt
def add_movie(request):
    user = User.objects.get(username=request.user)
    if request.method == "POST":
        try: 
            movie = request.POST.get('movie')
            seleclist = request.POST.get('seleclist')
            watchlist = Watchlist.objects.get(id=seleclist)
            watchlist.user = user
            watchlist.movie.add(movie)
            watchlist.save()
            return JsonResponse({'message': 'Added to your watchlist!'}, status=201)
        except:
            return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)

@login_required
@csrf_exempt
def delete_list(request):
    if request.method == "POST":
        try:
            list_id = request.POST.get('id')
            watchlist = Watchlist.objects.get(id=list_id)
            watchlist.delete()
            return JsonResponse({}, status=201)
        except:
            return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)

@login_required
@csrf_exempt
def delete(request):
    if request.method == "POST":
        try: 
            comment_id = request.POST.get('id')
            comment = Comments.objects.get(id=comment_id)
            comment.delete()
            return JsonResponse({}, status=201)
        except:
            return JsonResponse({}, status=404)
    return JsonResponse({}, status= 400)
    
@login_required
@csrf_exempt
def edit(request):
    if request.method == "POST":
        comment_id = request.POST.get('id')
        comment_body = request.POST.get('newComment')
        try: 
            comment = Comments.objects.get(id=comment_id)
            comment.comment = comment_body
            comment.save()
            return JsonResponse({}, status=201)
        except:
            return JsonResponse({}, status=404)

    return JsonResponse({}, status=400)

@login_required
@csrf_exempt
def rate_movie(request):
    user = User.objects.get(username=request.user)
    if request.method == "POST":
        movie_rating = request.POST.get('rating')
        movie_id = request.POST.get('movie_id')
        movie = Movie.objects.get(id=movie_id)

        if movie.ratings.filter(user=user):
            return JsonResponse({'message': 'You already rated this movie!'}, status=404)
        else:
            rating = Rating.objects.create(user=user, rating= movie_rating)
            rating.save()
            movie.ratings.add(rating)
            movie.save()
            return JsonResponse({'message': 'success'}, status=201)

    return JsonResponse({}, status=400)

def moviesland(request):
    movies = Movie.objects.all().order_by('title')
    return render(request, "movies/moviesland.html", {
        "movies": movies
    })

