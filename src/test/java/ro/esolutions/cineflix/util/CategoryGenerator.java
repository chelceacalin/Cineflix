package ro.esolutions.cineflix.util;

import ro.esolutions.cineflix.DTO.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;

import java.util.UUID;

public final class CategoryGenerator {
    public static Category aCategory() {
        return Category.builder()
                .id(UUID.fromString("cf7c88c8-e767-466e-95a0-ff00bd160d73"))
                .name("Drama")
                .isAvailable(true)
                .build();
    }

    public static CategoryDTO aCategoryDTO() {
       return CategoryDTO.builder()
                .name("Drama")
                .build();
    }
}
