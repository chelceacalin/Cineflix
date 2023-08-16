package ro.esolutions.cineflix.exceptions;

public class CategoryAlreadyExistsException extends Exception{
    public CategoryAlreadyExistsException(String message) {
        super(message);
    }
}
