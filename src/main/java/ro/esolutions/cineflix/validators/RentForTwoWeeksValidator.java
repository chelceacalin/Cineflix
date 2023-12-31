package ro.esolutions.cineflix.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ro.esolutions.cineflix.DTO.Movie.MovieHistoryDTO;
import ro.esolutions.cineflix.entities.MovieHistory;

import java.time.Duration;
import java.time.LocalDate;

public class RentForTwoWeeksValidator implements ConstraintValidator<RentForTwoWeeksConstraint, MovieHistoryDTO> {
    @Override
    public void initialize(RentForTwoWeeksConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(MovieHistoryDTO movieHistoryDTO, ConstraintValidatorContext constraintValidatorContext) {
        if (movieHistoryDTO == null) {
            return true;
        }

        LocalDate rentedDate = movieHistoryDTO.getRentedDate();
        LocalDate rentedUntil = movieHistoryDTO.getRentedUntil();

        long daysBetween = Duration.between(rentedDate.atStartOfDay(), rentedUntil.atStartOfDay()).toDays();

        return daysBetween <= 14;
    }
}
