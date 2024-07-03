package com.example.diamondstore.services;

import com.example.diamondstore.dto.DiamondDTO;
import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.repositories.DiamondMountRepository;
import com.example.diamondstore.repositories.DiamondRepository;
import com.example.diamondstore.services.interfaces.DiamondService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DiamondServiceImpl implements DiamondService{
    @Autowired
    private DiamondRepository diamondRepository;


    @Override
    public List<Diamond> DiamondList() {
        return diamondRepository.findAll();
    }

    @Override
    public Diamond getDiamondById(int id) {
        return diamondRepository.findDiamondByDiamondId(id);
    }

    @Override
    public Diamond createDiamond(DiamondDTO diamondDTO) {
        Diamond saveDiamond = diamondRepository.save(Diamond.builder()
                .diamondName(diamondDTO.getDiamondName())
                .origin(diamondDTO.getOrigin())
                .caratWeight(diamondDTO.getCaratWeight())
                .color(diamondDTO.getColor())
                .clarity(diamondDTO.getClarity())
                .cut(diamondDTO.getCut())
                .shape(diamondDTO.getShape())
                .basePrice(diamondDTO.getBasePrice())
                .build());
        return saveDiamond;
    }

    @Override
    public Diamond updateDiamond(DiamondDTO diamondDTO, int id) {
        Diamond saveDiamond = diamondRepository.findDiamondByDiamondId(id);
        saveDiamond.setDiamondName(diamondDTO.getDiamondName());
        saveDiamond.setOrigin(diamondDTO.getOrigin());
        saveDiamond.setCaratWeight(diamondDTO.getCaratWeight());
        saveDiamond.setColor(diamondDTO.getColor());
        saveDiamond.setClarity(diamondDTO.getClarity());
        saveDiamond.setCut(diamondDTO.getCut());
        saveDiamond.setShape(diamondDTO.getShape());
        saveDiamond.setBasePrice(diamondDTO.getBasePrice());

        return diamondRepository.save(saveDiamond);
    }
}
