package com.example.SOFTProject.model;

import lombok.Data;

@Data
public class MagazineForm {

    private Long id;
    private String name;
    private String author;
    private String edition;
    private String publisher;
    private String language;
    private String type;
    private Integer page;
    private Long reader;
    private String status;

}
