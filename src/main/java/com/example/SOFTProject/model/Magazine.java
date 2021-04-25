package com.example.SOFTProject.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Data
@Entity
@Table(name = "magazine")
@NoArgsConstructor
@AllArgsConstructor
@RequiredArgsConstructor
@EqualsAndHashCode(exclude = {"id", "registered", "updated"})
public class Magazine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NonNull
    private String name;

    @NonNull
    private String author;

    @NonNull
    private String edition;

    @NonNull
    private String publisher;

    @NonNull
    private String language;

    @NonNull
    private String type;

    @NonNull
    private Integer page;

    @NonNull
    private Long reader;

    @NonNull
    private String status;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date registered;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updated;

}
