package ro.esolutions.cineflix.specification;

import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import ro.esolutions.cineflix.entities.Category;
import ro.esolutions.cineflix.entities.Movie;
import ro.esolutions.cineflix.entities.MovieHistory;
import ro.esolutions.cineflix.entities.UserCineflix;

public class MovieSpecification {

    public static <T> Specification<T> hasUsername(String username) {
        return (root, query, criteriaBuilder) -> {
            if (username == null) return null;
            return criteriaBuilder.equal(root.get("owner").get("username"), username);
        };
    }

    public static <T> Specification<T> hasCategory(String categoryName){
        return (root, query, criteriaBuilder) -> {
            Join<Movie, Category> categoryJoin = root.join("category");
            return criteriaBuilder.like(criteriaBuilder.lower(categoryJoin.get("name")), "%" + categoryName.toLowerCase() + "%");
        };
    }
    public static <T> Specification<T> getRentedBy(String username){
        return (root, query, criteriaBuilder) -> {
            Join<Movie, MovieHistory> movieHistoryJoin = root.join("movieHistories", JoinType.INNER);
            Join<MovieHistory, UserCineflix> userJoin = movieHistoryJoin.join("rentedBy",JoinType.INNER);
            return criteriaBuilder.equal(userJoin.get("username"),username);
        };
    }
}
