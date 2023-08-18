package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserCineflixSpecification {

    public static final String USERNAME = "username";

    public static <T> Specification<T> hasRole(String role) {
        return (root, query, criteriaBuilder) -> {
            UserCineflix.Role enumRole = UserCineflix.Role.valueOf(role.toUpperCase());
            return criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("role").as(String.class)),
                    enumRole.name().toLowerCase()
            );
        };
    }
    public static <T> Specification<T> hasUsernameEquals(String username){
        return ((root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(USERNAME)), username.toLowerCase()));
    };

}
