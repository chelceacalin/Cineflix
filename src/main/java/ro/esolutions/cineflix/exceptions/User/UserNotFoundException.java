package ro.esolutions.cineflix.exceptions.User;

public class UserNotFoundException extends RuntimeException{
    public UserNotFoundException(String message) {
        super(message);
    }
}
