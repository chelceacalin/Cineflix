package ro.esolutions.cineflix.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Component;
import ro.esolutions.cineflix.services.UserCineflixService;

@Component
@RequiredArgsConstructor
public class AuthenticationEvents {

    private final UserCineflixService userCineflixService;

    @EventListener
    public void onSuccess(AuthenticationSuccessEvent success) {
        if (success.getAuthentication().getPrincipal() instanceof OidcUser oidcUser) {
            OidcUserInfo userInfo = oidcUser.getUserInfo();
            if (userInfo != null) {
                userCineflixService.addUserCineflix(userInfo);
            }
        }
    }
}
