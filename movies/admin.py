from django.contrib import admin

from .models import *

admin.site.register(User)
admin.site.register(Movie)
admin.site.register(Comments)
admin.site.register(Rating)
admin.site.register(Watchlist)