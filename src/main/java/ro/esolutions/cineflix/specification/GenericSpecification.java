package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.UserCineflix;

public class GenericSpecification {

    public static <T> Specification<T> fieldNameLike(String field, String fieldName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like( criteriaBuilder.lower(root.get(fieldName)), "%" + field.toLowerCase() + "%");
    }

    public static <T> Specification<T> getUsernameLike(String field, UserCineflix user) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like( criteriaBuilder.lower(root.get(user.getUsername())), "%" + field.toLowerCase() + "%");
    }

    public static <T> Specification<T> isAvailable(Boolean isAvailable) {
        return ((root, query, criteriaBuilder) -> {
            if (isAvailable) {
                return criteriaBuilder.isTrue(root.get("isAvailable"));
            } else {
                return criteriaBuilder.isFalse(root.get("isAvailable"));
            }
        });
    }
}
