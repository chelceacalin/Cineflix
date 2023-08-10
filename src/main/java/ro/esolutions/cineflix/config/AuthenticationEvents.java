package ro.esolutions.cineflix.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AbstractAuthenticationFailureEvent;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

@Component
@RequiredArgsConstructor
public class AuthenticationEvents {
    private final UserCineflixService userCineflixService;
    @EventListener
    public void onSuccess(AuthenticationSuccessEvent success) {
       var oidcUser =  (OidcUser)success.getAuthentication().getPrincipal();
       var userInfo =  oidcUser.getUserInfo();
        UserCineflix userCineflix = new UserCineflix(
                            userInfo.getClaim("sub"),
                            userInfo.getClaim("preferred_username"),
                            userInfo.getClaim("given_name"),
                            userInfo.getClaim("family_name"),
                            userInfo.getClaim("email"),
                            UserCineflix.Role.USER
                    );

                   userCineflixService.addUserCineflix(userCineflix);
    }

    @EventListener
    public void onFailure(AbstractAuthenticationFailureEvent failures) {

    }
}
