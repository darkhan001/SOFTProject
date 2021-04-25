package com.example.SOFTProject.controllers;

import com.example.SOFTProject.model.Magazine;
import com.example.SOFTProject.model.MagazineForm;
import com.example.SOFTProject.repositories.MagazineRepo;
import com.example.SOFTProject.service.MagazineService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class MagazineRestController {

    private final MagazineService magazineService;
    private final MagazineRepo magazineRepo;

    @GetMapping(value = "/api/magazine")
    public ResponseEntity<List<Magazine>> readAll() {
        final List<Magazine> magazines = magazineService.getAllMagazines();

        return magazines != null && !magazines.isEmpty()
                ? new ResponseEntity<>(magazines, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = "/api/magazine/{id}")
    public ResponseEntity<Magazine> read(@PathVariable(name = "id") long id) {
        final Magazine magazine = magazineService.getMagazine(id);

        return magazine != null
                ? new ResponseEntity<>(magazine, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = "/api/magazine/save")
    public ResponseEntity<?> create(@RequestBody MagazineForm magazineForm) {
        magazineService.createMagazine(magazineForm);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping(value = "/api/magazine/update")
    public ResponseEntity<?> update(@RequestBody MagazineForm magazineForm) {
        magazineService.updateMagazine(magazineForm);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = "/api/magazine/delete/{id}")
    public ResponseEntity<?> delete(@PathVariable(name = "id") long id) {
        magazineService.deleteMagazine(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/api/user/magazine/{id}")
    public ResponseEntity<List<Magazine>> getUserMagazine(@PathVariable(name = "id") long id) {
        List<Magazine> magazines = magazineService.getAllMagazines();
        List<Magazine> result = new ArrayList<>();

        for (Magazine magazine : magazines) {
            if (magazine.getReader().equals(id) && (magazine.getStatus().equals("initial") || magazine.getStatus().equals("reading"))) {
                result.add(magazine);
            }
        }

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @PutMapping(value = "/api/user/magazine/status/{id}")
    public ResponseEntity<?> updateUserMagazine(@PathVariable(name = "id") Long id,
                                                @RequestBody String status) {

        Magazine magazine = magazineService.getMagazine(id);
        if (magazine != null) {
            magazine.setStatus(status);
            magazineRepo.save(magazine);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

}
