package ro.esolutions.cineflix.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;

public class MovieSpecification {
    public static final String MOVIE_HISTORIES = "movieHistories";
    public static final String RENTED_BY = "rentedBy";
    public static final String NAME = "name";
    public static final String OWNER = "owner";
    private static final String USERNAME = "username";
    private static final String CATEGORY_FIELD = "category";

    public static <T> Specification<T> hasUsername(String username) {
        return (root, query, criteriaBuilder) -> {
            if (username == null) return null;
            return criteriaBuilder.equal(root.get(OWNER).get(USERNAME), username);
        };
    }

    public static <T> Specification<T> hasCategory(String categoryName) {
        return (root, query, criteriaBuilder) -> {
            Join<Movie, Category> categoryJoin = root.join(CATEGORY_FIELD);
            return criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get(NAME)), "%" + categoryName.toLowerCase() + "%");
        };
    }

    public static <T> Specification<T> getRentedBy(String username) {
        return (root, query, criteriaBuilder) -> {
            Join<Movie, MovieHistory> movieHistoryJoin = root.join(MOVIE_HISTORIES, JoinType.INNER);
            Join<MovieHistory, UserCineflix> userJoin = movieHistoryJoin.join(RENTED_BY, JoinType.INNER);
            return criteriaBuilder.equal(userJoin.get(USERNAME), username);
        };
    }
}
