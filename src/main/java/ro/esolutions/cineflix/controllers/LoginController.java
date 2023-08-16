package ro.esolutions.cineflix.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.services.UserCineflixService;

@RestController
public class LoginController {

    @Autowired
    private UserCineflixService userCineflixService;

    @GetMapping("/userInfo")
    public Authentication getAdmin() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() != null) {
            return authentication;
        }
        return null;
    }


}
