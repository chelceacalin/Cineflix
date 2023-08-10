package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.specification.UserCineflixSpecification;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCineflixService {
    @NonNull
    private final UserCineflixRepository userCineflixRepository;

    public Page<UserCineflix> getUsers(String firstName, String lastName, String email, Boolean isActive, String role, int pageNo, int pageSize, String sortField, String direction) {

        Specification<UserCineflix> specification = Specification.where(null);

        if (firstName != null) {
            specification = specification.and(UserCineflixSpecification.firstNameLike(firstName));
        }

        if (lastName != null) {
            specification = specification.and(UserCineflixSpecification.lastNameLike(lastName));
        }

        if (email != null) {
            specification = specification.and(UserCineflixSpecification.emailLike(email));
        }

        if (isActive != null) {
            specification = specification.and(UserCineflixSpecification.isActive(isActive));
        }

        if (role != null) {
            specification = specification.and(UserCineflixSpecification.hasRole(role));
        }

        Pageable pageable;
        Sort.Direction sortDirection = Sort.Direction.fromString(direction);

        if (sortField.equals("defaultSort")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, "firstName", "lastName"));
        } else {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, sortField));
        }

        return userCineflixRepository.findAll(specification, pageable);

    }

    public void addUserCineflix(UserCineflix userCineflix){
        Optional<UserCineflix> userCineflixNew = userCineflixRepository.findById(userCineflix.getId());
        if (userCineflixNew.isEmpty()) {
            userCineflixRepository.save(userCineflix);
        }
    }

}
