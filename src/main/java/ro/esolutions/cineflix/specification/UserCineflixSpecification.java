package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.entities.UserCineflix;

public class UserCineflixSpecification {


    public static Specification<UserCineflix> fieldNameLike(String field,String fieldName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(fieldName)), "%" + field.toLowerCase() + "%");
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
