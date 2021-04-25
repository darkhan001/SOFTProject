package com.example.SOFTProject.service;

import com.example.SOFTProject.model.Magazine;
import com.example.SOFTProject.model.MagazineForm;

import java.util.List;

public interface MagazineService {

    List<Magazine> getAllMagazines();

    Magazine getMagazine(long id);

    void createMagazine(MagazineForm magazineForm);

    void updateMagazine(MagazineForm magazineForm);

    void deleteMagazine(long id);

    boolean validateMagazine(Magazine magazine);

}
