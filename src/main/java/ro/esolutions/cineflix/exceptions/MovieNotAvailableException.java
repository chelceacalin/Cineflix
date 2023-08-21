package ro.esolutions.cineflix.exceptions;

public class MovieNotAvailableException extends RuntimeException{
    public MovieNotAvailableException(String message) {
        super(message);
    }

}
