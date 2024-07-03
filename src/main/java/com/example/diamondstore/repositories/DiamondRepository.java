package com.example.diamondstore.repositories;

import com.example.diamondstore.entities.Diamond;
import com.example.diamondstore.entities.DiamondMount;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DiamondRepository extends JpaRepository<Diamond, Integer> {
    Diamond findDiamondByDiamondId(int id);
}
