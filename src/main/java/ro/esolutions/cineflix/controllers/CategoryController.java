package ro.esolutions.cineflix.controllers;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.DTO.CategoryFilterDTO;
import ro.esolutions.cineflix.DTO.UserDTO;
import ro.esolutions.cineflix.DTO.UserFilterDTO;
import ro.esolutions.cineflix.services.CategoryService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/categories")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping()
    public Page<CategoryDTO> getCategories(@ModelAttribute CategoryFilterDTO dto,
                                  @RequestParam(defaultValue = "0",required = false) int pageNo,
                                  @RequestParam(defaultValue = "15",required = false) int pageSize) {
        return categoryService.getCategories(dto,pageNo,pageSize);
    }
}
