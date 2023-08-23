package ro.esolutions.cineflix.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import ro.esolutions.cineflix.entities.MovieHistory;

import java.time.Duration;
import java.time.LocalDate;

public class RentForTwoWeeksValidator implements ConstraintValidator<RentForTwoWeeksConstraint, MovieHistory> {
    @Override
    public void initialize(RentForTwoWeeksConstraint constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(MovieHistory movieHistory, ConstraintValidatorContext constraintValidatorContext) {
        if (movieHistory == null) {
            return true;
        }

        LocalDate rentedDate = movieHistory.getRentedDate();
        LocalDate rentedUntil = movieHistory.getRentedUntil();

        long daysBetween = Duration.between(rentedDate.atStartOfDay(), rentedUntil.atStartOfDay()).toDays();

        return daysBetween <= 14;
    }
}
