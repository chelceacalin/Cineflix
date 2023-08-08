package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

import java.util.List;

import static org.springframework.http.ResponseEntity.ok;

@RestController
@RequiredArgsConstructor
public class UserRoleManagementController {

    private final UserCineflixService userCineflixService;

    @GetMapping("/allUsers")
    public List<UserCineflix> getAll(@RequestParam(required = false) String firstName,
                                     @RequestParam(required = false)  String lastName,
                                     @RequestParam(required = false)  String email) {

        if(firstName==null&&lastName==null&&email==null) return userCineflixService.findAll();

        return userCineflixService.getUsers(firstName, lastName, email);
    }
}
