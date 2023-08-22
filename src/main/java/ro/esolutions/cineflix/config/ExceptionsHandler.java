package ro.esolutions.cineflix.config;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import ro.esolutions.cineflix.exceptions.Category.CategoryAlreadyExistsException;
import ro.esolutions.cineflix.exceptions.Category.CategoryContainsMovieException;
import ro.esolutions.cineflix.exceptions.Category.CategoryNotFoundException;
import ro.esolutions.cineflix.exceptions.Category.EmptyCategoryNameField;
import ro.esolutions.cineflix.exceptions.Movie.MovieIsNotRented;
import ro.esolutions.cineflix.exceptions.Movie.MovieNotFoundException;
import ro.esolutions.cineflix.exceptions.MovieImageData.MovieImageDataNotFoundException;
import ro.esolutions.cineflix.exceptions.User.UserNotFoundException;

import java.io.IOException;
import java.util.zip.DataFormatException;
import ro.esolutions.cineflix.exceptions.*;

@ControllerAdvice
public class ExceptionsHandler {

    @ExceptionHandler(CategoryNotFoundException.class)
    public ResponseEntity<String> handleCategoryNotFoundException(CategoryNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(EmptyCategoryNameField.class)
    public ResponseEntity<String> handleEmptyCategoryNameField(EmptyCategoryNameField ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(CategoryAlreadyExistsException.class)
    public ResponseEntity<String> handleCategoryAlreadyExistsException(CategoryAlreadyExistsException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MovieNotAvailableException.class)
    public ResponseEntity<String> handleMovieNotAvailableException(MovieNotAvailableException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.METHOD_NOT_ALLOWED);
    }

    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<String> handleMovieNotFoundException(MovieNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MovieImageDataNotFoundException.class)
    public ResponseEntity<String> handleMovieImageDataNotFoundException(MovieImageDataNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler({IOException.class, DataFormatException.class})
    public ResponseEntity<String> handleByteCompressionError(MovieImageDataNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<String> handleUserNotFoundException(UserNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
    @ExceptionHandler(MovieIsNotRented.class)
    public ResponseEntity<String> handleMovieIsNotRented(MovieIsNotRented ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }
}
