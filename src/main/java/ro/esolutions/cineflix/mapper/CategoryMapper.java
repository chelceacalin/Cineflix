package ro.esolutions.cineflix.mapper;

import ro.esolutions.cineflix.DTO.Category.CategoryDTO;
import ro.esolutions.cineflix.entities.Category;


public class CategoryMapper {

    public static CategoryDTO toDTO(Category category){
        return CategoryDTO.builder()
                .id(category.getId())
                .name(category.getName())
                .build();
    }
}
