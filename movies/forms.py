from django import forms
from django.forms import ModelForm
from .models import *

class CommentForm(ModelForm):
    class Meta:
        model = Comments
        fields = ['comment']
        widgets = {
            'comment': forms.Textarea(attrs={'class': 'comment', 'placeholder': 'Write your review here...'})
        }

class WatchlistForm(ModelForm):
    class Meta:
        model = Watchlist
        fields = ['watchlist', 'movie']
        
    