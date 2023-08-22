package ro.esolutions.cineflix.exceptions.Movie;

public class MovieIsNotRented extends RuntimeException{
    public MovieIsNotRented(String message){
        super(message);
    }
}
