## CS50’s Web Programming with Python and JavaScript
# FINAL PROJECT: PELICULISTAS

Welcome to my final project for Harvard's CS50 Web! Peliculistas is an app made with love by me and some help from Python, Django and Javascript :)

Watch video: https://www.youtube.com/watch?v=Cq3plmYexgM&t=1s

Visit online (updated version): http://peliculistas.herokuapp.com/

### Technologies:
1. Python/Django
2. Javascript
3. HTML
4. CSS

### Specification:

* **Peliculistas** is a web app where visitors and users will be able to check and look for movie info (provided by the moviedb API) and registered users will have the priviledge of saving movies on their personal movie board, create personalized watchlists, post reviews or rate movies. 
- To bring the data from moviedb.org I use Javascript so the app prints all the information on the index page or can be displayed by a 'query' by the user aswell. 
- Once we have that data, users take action by 'saving' films, so they are copying all that information to our own database and now is available for users to take more interesting and complex actions like: post reviews, rate movies or create personalized watchlists with movies. 
- To accomplish this I created 5 Django models: user, comments, rating, watchlist and movie.

## Project description

1. **Index**: 
    * Users will see three different movie rankings:
        1. Now Playing: it shows 20 first results but users can load more when they reach the bottom of the page.
        2. Trending Movies: ranking of 20 first trending movies.
        3. Top Rated Movies: ranking of 20 top rated movies.

<img src="https://i.ibb.co/Tmr5N7f/Captura-de-pantalla-2021-03-29-a-las-13-05-28.png" alt="Captura-de-pantalla-2021-03-29-a-las-13-05-28" border="0">

2. **Search:** from navbar users will be able to type any movie and get the related results: 

<img src="https://i.ibb.co/Th7wThS/Captura-de-pantalla-2021-03-29-a-las-13-23-11.png" alt="Captura-de-pantalla-2021-03-29-a-las-13-23-11" border="0">

3. **Movie Info:** When the user clicks on any movie card is taken to a new page where he can see all the extended information about that movie:

<a href="https://ibb.co/JcWt19W"><img src="https://i.ibb.co/QJ7Qg47/Captura-de-pantalla-2021-03-29-a-las-16-27-10.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-27-10" border="0"></a>
On this page, members will be able to take special actions like: 
        - **Save Movie:** When members click on 'Save', the movie is automatically saved on the app database and the user's movie board and then, he will be able to add the movie to their personalized watchlists aswell. 
        <img src="https://i.ibb.co/L5t9gFX/Captura-de-pantalla-2021-03-29-a-las-16-43-16.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-43-16" border="0"> 
        <img src="https://i.ibb.co/c6VphNR/Captura-de-pantalla-2021-03-29-a-las-16-58-45.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-58-45" border="0">
        - **Rate Movie:** Members can rate movies so they will be able to see the global rate (brought by the API) and the internal rate, calculated by the members ratings. Users can vote only one time per movie, otherwise they will see a message like this:
        <a href="https://imgbb.com/"><img src="https://i.ibb.co/v301K25/Captura-de-pantalla-2021-03-29-a-las-16-46-56.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-46-56" border="0"></a>
        - **Post a review:** members can add reviews, and also edit them or delete them.  
        <img src="https://i.ibb.co/rbbHvjD/Captura-de-pantalla-2021-03-29-a-las-16-52-59.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-52-59" border="0">
        <img src="https://i.ibb.co/3yhNwVf/Captura-de-pantalla-2021-03-29-a-las-16-53-20.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-53-20" border="0">
        - **Similar Movies**: clicking on the button 'similar movies' user will see a selection of similar movies on the same page, requested by an API call with Javascript. They can close this view by clicking on the 'X' on the right.
        <img src="https://i.ibb.co/bbjpjRB/Captura-de-pantalla-2021-03-29-a-las-16-55-16.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-55-16" border="0">



4. **Personal movie board:** When members click on their name (link situated on the navbar) they are taken to their personal movie board. Here the user will see all movies he saved. 
<img src="https://i.ibb.co/mSqwR0P/Captura-de-pantalla-2021-03-29-a-las-16-19-16.png" alt="Captura-de-pantalla-2021-03-29-a-las-16-19-16" border="0">

5. **Watchlists**: From this section, users can create new lists to organize their movies, access their lists or delete them.
<img src="https://i.ibb.co/6YQy1qv/Captura-de-pantalla-2021-03-29-a-las-17-00-17.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-00-17" border="0">

6. **Whatchlist:** by clicking on each list's title user will see all movies inside that particular list and he will be able to delete movies from it by clicking on the 'x'.
<img src="https://i.ibb.co/QXsyjVG/Captura-de-pantalla-2021-03-29-a-las-17-02-24.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-02-24" border="0">

## **Responsive Design**:
<img src="https://i.ibb.co/FhQ2PSq/Captura-de-pantalla-2021-03-29-a-las-17-10-39.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-10-39" border="0">
<img src="https://i.ibb.co/hfxs3yQ/Captura-de-pantalla-2021-03-29-a-las-17-10-55.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-10-55" border="0">
<img src="https://i.ibb.co/rvc60bB/Captura-de-pantalla-2021-03-29-a-las-17-11-03.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-11-03" border="0">
<img src="https://i.ibb.co/PcV1gxq/Captura-de-pantalla-2021-03-29-a-las-17-11-14.png" alt="Captura-de-pantalla-2021-03-29-a-las-17-11-14" border="0">
<img src="https://i.ibb.co/GHwWcZ7/screencapture-127-0-0-1-8000-movie-544401-2021-03-29-17-13-31.png" alt="screencapture-127-0-0-1-8000-movie-544401-2021-03-29-17-13-31" border="0">

