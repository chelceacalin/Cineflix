package ro.esolutions.cineflix.exceptions;

public class EmptyCategoryNameField extends RuntimeException {
    public EmptyCategoryNameField(String message) {
        super(message);
    }
}
