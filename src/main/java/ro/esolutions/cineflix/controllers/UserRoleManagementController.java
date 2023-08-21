package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.UserCineflix.UserDTO;
import ro.esolutions.cineflix.DTO.UserCineflix.UserFilterDTO;
import ro.esolutions.cineflix.entities.UserCineflix;
import ro.esolutions.cineflix.services.UserCineflixService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/users")

public class UserRoleManagementController {

    private final UserCineflixService userCineflixService;

    @GetMapping
    public Page<UserDTO> getUsers(@ModelAttribute UserFilterDTO dto,
                                  @RequestParam(defaultValue = "0", required = false) int pageNo,
                                  @RequestParam(defaultValue = "15", required = false) int pageSize) {
        return userCineflixService.getUsers(dto, pageNo, pageSize);
    }

    @PostMapping("/update/{role}")
    public ResponseEntity<UserCineflix> updateUserRole(@RequestBody UserDTO userDTO, @PathVariable("role") UserCineflix.Role role) {
        return ResponseEntity.ok(userCineflixService.updateUserRole(userDTO, role));
    }

    @GetMapping("/{username}")
    public UserDTO findByUsername(@PathVariable String username) throws Exception {
        return userCineflixService.findUserByUsername(username);
    }
}