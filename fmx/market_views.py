from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth.decorators import login_required
from django.db.models import Avg, Count
import json
import requests
import http.client
import datetime
from .models import Team, Player, Fixture, User
# Create your views here.


def market(request):
     return render(request, "fmx/market.html")
            #, {
             #   "PostForm": form, "check":"yes"
            #})