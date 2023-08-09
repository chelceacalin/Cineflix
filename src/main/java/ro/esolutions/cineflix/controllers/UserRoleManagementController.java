package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserRoleManagementController {

    private final UserCineflixService userCineflixService;

    @GetMapping("/all")
    public Page<UserCineflix> getUsers(@RequestParam(required = false) String firstName,
                                       @RequestParam(required = false) String lastName,
                                       @RequestParam(required = false) String email,
                                       @RequestParam(required = false) Boolean isActive,
                                       @RequestParam(required = false) String role,
                                       @RequestParam(required = false, defaultValue = "0") int pageNo,
                                       @RequestParam(required = false, defaultValue = "15") int pageSize,
                                       @RequestParam(required = false, defaultValue = "defaultSort") String sortField,
                                       @RequestParam(required = false, defaultValue = "ASC") String direction
    ) {
        return userCineflixService.getUsers(firstName, lastName, email, isActive, role, pageNo, pageSize, sortField, direction);
    }

}