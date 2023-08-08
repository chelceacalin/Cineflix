package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.repository.UserCineflixRepository;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCineflixServiceImpl implements UserCineflixService {

    private final UserCineflixRepository userCineflixRepository;

    @Override
    public List<UserCineflix> findAllOrderedByName() {
        return userCineflixRepository.findAllOrderedByName();
    }
}
