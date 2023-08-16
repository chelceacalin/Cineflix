package ro.esolutions.cineflix.controllers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.services.UserCineflixService;

@RestController
public class DemoLogin {

    @Autowired
    private UserCineflixService userCineflixService;

    @ModelAttribute("authentication")
    public Authentication getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication.getPrincipal() !=null) {
            return authentication;
        }
        return null;
    }

    @GetMapping("/admin")
    public Authentication getAdmin(@ModelAttribute("authentication") Authentication auth) {
       return auth;
    }


}
