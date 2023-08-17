package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserCineflixSpecification {

    public static <T> Specification<T> hasRole(String role) {
        return (root, query, criteriaBuilder) -> {
            UserCineflix.Role enumRole = UserCineflix.Role.valueOf(role.toUpperCase());
            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("role").as(String.class)),
                    enumRole.name().toLowerCase()
            );
        };
    }

}
