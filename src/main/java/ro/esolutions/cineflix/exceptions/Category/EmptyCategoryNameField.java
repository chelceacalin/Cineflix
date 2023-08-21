package ro.esolutions.cineflix.exceptions.Category;

public class EmptyCategoryNameField extends RuntimeException {
    public EmptyCategoryNameField(String message) {
        super(message);
    }
}
