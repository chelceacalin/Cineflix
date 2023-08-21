package ro.esolutions.cineflix.exceptions.Category;

public class CategoryContainsMovieException extends RuntimeException{
    public CategoryContainsMovieException(String message) {
        super(message);
    }
}
