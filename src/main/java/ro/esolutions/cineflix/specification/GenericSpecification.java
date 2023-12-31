package ro.esolutions.cineflix.specification;

import org.springframework.data.jpa.domain.Specification;

public class GenericSpecification {

    public static final String IS_AVAILABLE = "isAvailable";

    public static <T> Specification<T> fieldNameLike(String field, String fieldName) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(criteriaBuilder.lower(root.get(fieldName)), "%" + field.toLowerCase() + "%");
    }

    public static <T> Specification<T> isAvailable(Boolean isAvailable) {
        return ((root, query, criteriaBuilder) -> {
            if (isAvailable) {
                return criteriaBuilder.isTrue(root.get(IS_AVAILABLE));
            } else {
                return criteriaBuilder.isFalse(root.get(IS_AVAILABLE));
            }
        });
    }
}
