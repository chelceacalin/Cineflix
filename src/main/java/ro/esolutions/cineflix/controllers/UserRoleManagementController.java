package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserRoleManagementController {

    private final UserCineflixService userCineflixService;

    @GetMapping("/allUsers")
    public List<UserCineflix> userManagementController() {
        return userCineflixService.findAllOrderedByName();
    }
}
