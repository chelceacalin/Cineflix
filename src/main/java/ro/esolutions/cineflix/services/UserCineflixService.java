package ro.esolutions.cineflix.services;

import jakarta.transaction.Transactional;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.stereotype.Service;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.mapper.UserMapper;
import ro.esolutions.cineflix.repositories.UserCineflixRepository;
import ro.esolutions.cineflix.specification.UserCineflixSpecification;

import java.util.Optional;

import static java.util.Objects.nonNull;

@Service
@Transactional
@RequiredArgsConstructor
public class UserCineflixService {

    @NonNull
    private final UserCineflixRepository userCineflixRepository;

    public Page<UserDTO> getUsers(UserFilterDTO dto, int pageNo, int pageSize) {
        if (dto.getUsername() == null && dto.getEmail() == null && dto.getRole() == null&&dto.getFirstName()==null&&dto.getLastName()==null&&dto.getSortField()==null&&dto.getDirection()==null) {
            return userCineflixRepository.findAll(PageRequest.of(pageNo, pageSize)).map(UserMapper::toDTO);
        }

        Specification<UserCineflix> specification = getSpecification(dto);
        Pageable pageable;
        Sort.Direction sortDirection = Sort.Direction.fromString(dto.getDirection());
        if (dto.getSortField().equals("defaultsort")) {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, "firstName","lastName"));
        } else {
            pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortDirection, dto.getSortField()));
        }
        return userCineflixRepository.findAll(specification, pageable).map(UserMapper::toDTO);
    }

    public Specification<UserCineflix> getSpecification(UserFilterDTO dto) {
        Specification<UserCineflix> specification = Specification.where(null);

        if (nonNull(dto.getFirstName())) {
            specification = specification.and(UserCineflixSpecification.fieldNameLike(dto.getFirstName(),"firstName"));
        }

        if (nonNull(dto.getLastName())) {
            specification = specification.and(UserCineflixSpecification.fieldNameLike(dto.getLastName(),"lastName"));
        }

        if (nonNull(dto.getEmail())) {
            specification = specification.and(UserCineflixSpecification.fieldNameLike(dto.getEmail(),"email"));
        }

        if (nonNull(dto.getRole())) {
            specification = specification.and(UserCineflixSpecification.hasRole(dto.getRole().toString()));
        }
        return specification;
    }

    public UserCineflix updateUserRole(UserDTO userDTO, UserCineflix.Role role) {
        Optional<UserCineflix> userCineflixOptional = userCineflixRepository.findByUsername(userDTO.getUsername());
        UserCineflix updatedUserCineflix = new UserCineflix();
        if(userCineflixOptional.isPresent()){
            UserCineflix userCineflix = userCineflixOptional.get();
            userCineflix.setRole(role);
            updatedUserCineflix = userCineflixRepository.save(userCineflix);
        }
        return updatedUserCineflix;
    }

    public void addUserCineflix(OidcUserInfo userInfo) {

        UserCineflix userCineflix = new UserCineflix(
                userInfo.getClaim("sub"),
                userInfo.getClaim("preferred_username"),
                userInfo.getClaim("given_name"),
                userInfo.getClaim("family_name"),
                userInfo.getClaim("email"),
                UserCineflix.Role.USER
        );

        Optional<UserCineflix> userCineflixNew = userCineflixRepository.findById(userCineflix.getId());
        if (userCineflixNew.isEmpty()) {
            userCineflixRepository.save(userCineflix);
        }
    }

}