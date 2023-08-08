package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repository.UserCineflixRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCineflixService {

    private final UserCineflixRepository userCineflixRepository;

    public List<UserCineflix> findAll() {
        return userCineflixRepository.findAll();
    }

    public List<UserCineflix> getUsers(String firstName,String lastName, String email){
        return  userCineflixRepository.findByFirstNameIgnoreCaseContainingOrLastNameIgnoreCaseContainingOrEmailIgnoreCaseContaining(firstName,lastName, email);
    }
}
