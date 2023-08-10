package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.services.UserCineflixService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")
public class UserRoleManagementController {

    private final UserCineflixService userCineflixService;

    @GetMapping
    public Page<UserDTO> getUsers(@ModelAttribute UserFilterDTO dto,
                                  @RequestParam(defaultValue = "0",required = false) int pageNo,
                                  @RequestParam(defaultValue = "15",required = false) int pageSize) {
        return userCineflixService.getUsers(dto,pageNo,pageSize);
    }


    @PostMapping("/{id}/update/{role}")
    public ResponseEntity<UserCineflix> updateUserRole(@PathVariable("id") String id, @PathVariable("role")UserCineflix.Role role) {
        return ResponseEntity.ok(userCineflixService.updateUserRole(id,role));
    }
}