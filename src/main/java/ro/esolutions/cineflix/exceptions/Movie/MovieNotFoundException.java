package ro.esolutions.cineflix.exceptions.Movie;

public class MovieNotFoundException extends RuntimeException{
    public MovieNotFoundException(String message){
        super(message);
    }
}
