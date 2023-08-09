package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserCineflixSpecification {

    public static Specification<UserCineflix> firstNameLike(String firstName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("firstName")), "%" + firstName.toLowerCase() + "%");
    }

    public static Specification<UserCineflix> lastNameLike(String lastName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("lastName")), "%" + lastName.toLowerCase() + "%");
    }

    public static Specification<UserCineflix> emailLike(String email) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get("email")), "%" + email.toLowerCase() + "%");
    }

    public static Specification<UserCineflix> isActive(Boolean isActive) {
        return (root, query, criteriaBuilder) -> {
            if (isActive) {
                return criteriaBuilder.isTrue(root.get("isActive"));
            } else {
                return criteriaBuilder.isFalse(root.get("isActive"));
            }
        };
    }

    public static Specification<UserCineflix> hasRole(String role) {
        return (root, query, criteriaBuilder) -> {
            UserCineflix.Role enumRole = UserCineflix.Role.valueOf(role.toUpperCase());
            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("role").as(String.class)),
                    enumRole.name().toLowerCase()
            );
        };
    }

}
