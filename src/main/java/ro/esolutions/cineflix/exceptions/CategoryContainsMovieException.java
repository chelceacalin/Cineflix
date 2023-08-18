package ro.esolutions.cineflix.exceptions;

public class CategoryContainsMovieException extends RuntimeException{
    public CategoryContainsMovieException(String message) {
        super(message);
    }
}
