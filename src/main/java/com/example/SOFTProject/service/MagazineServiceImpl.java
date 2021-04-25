package com.example.SOFTProject.service;

import com.example.SOFTProject.model.Magazine;
import com.example.SOFTProject.model.MagazineForm;
import com.example.SOFTProject.repositories.MagazineRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MagazineServiceImpl implements MagazineService {

    private final MagazineRepo magazineRepo;

    @Override
    @Transactional(readOnly = true)
    public List<Magazine> getAllMagazines() {
        return magazineRepo.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Magazine getMagazine(long id) {
        return magazineRepo.findById(id).isPresent() ? magazineRepo.findById(id).get() : null;
    }

    @Override
    public void createMagazine(MagazineForm magazineForm) {
        Magazine magazine = new Magazine(magazineForm.getName(), magazineForm.getAuthor(),
                magazineForm.getEdition(), magazineForm.getPublisher(), magazineForm.getLanguage(),
                magazineForm.getType(), magazineForm.getPage(), magazineForm.getReader(), "initial");

        if (!validateMagazine(magazine)) {
            magazine.setRegistered(new Date());
            magazine.setUpdated(new Date());
            magazineRepo.save(magazine);
        }
    }

    @Transactional
    @Override
    public void updateMagazine(MagazineForm magazineForm) {
        Magazine magazine = getMagazine(magazineForm.getId());
        magazine.setName(magazineForm.getName());
        magazine.setAuthor(magazineForm.getAuthor());
        magazine.setEdition(magazineForm.getEdition());
        magazine.setPublisher(magazineForm.getPublisher());
        magazine.setLanguage(magazineForm.getLanguage());
        magazine.setType(magazineForm.getType());
        magazine.setPage(magazineForm.getPage());
        magazine.setReader(magazineForm.getReader());
        magazine.setStatus(magazineForm.getStatus());
        magazine.setUpdated(new Date());

        magazineRepo.save(magazine);
    }

    @Override
    public void deleteMagazine(long id) {
        magazineRepo.deleteById(id);
    }

    @Override
    public boolean validateMagazine(Magazine magazine) {
        List<Magazine> magazines = magazineRepo.findAll();
        for (Magazine m : magazines) {
            if (m.equals(magazine)) {
                return true;
            }
        }
        return false;
    }
}
