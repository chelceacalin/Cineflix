package ro.esolutions.cineflix.controllers;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.DTO.UserInfoDTO;
import ro.esolutions.cineflix.services.UserCineflixService;
import static java.util.Objects.nonNull;

@RestController
public class LoginController {

    private final UserCineflixService userCineflixService;

    public LoginController(UserCineflixService userCineflixService) {
        this.userCineflixService = userCineflixService;
    }

    @GetMapping("/userInfo")
    public UserInfoDTO getAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (nonNull(authentication.getPrincipal()) && authentication.getPrincipal() instanceof OidcUser oidcUser) {
            return userCineflixService.getUserInfo(oidcUser);
        }

        throw new UsernameNotFoundException("User not found");
    }

}