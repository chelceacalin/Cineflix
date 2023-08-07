package com.example.demoInternship.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.Period;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "elev")
public class Elev {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    private String nume;

    private LocalDate birthdate;

    private Integer age;
    public Integer getAge() {
        if (birthdate != null) {
            LocalDate currentDate = LocalDate.now();
            return Period.between(birthdate, currentDate).getYears();
        }
        return null;
    }
}
