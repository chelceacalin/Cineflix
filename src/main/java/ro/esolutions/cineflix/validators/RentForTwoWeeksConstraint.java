package ro.esolutions.cineflix.validators;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ElementType.TYPE})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = RentForTwoWeeksValidator.class)
public @interface RentForTwoWeeksConstraint {
    String message() default "A movie can be rented for maximum two weeks";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};

}

