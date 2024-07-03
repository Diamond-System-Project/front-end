package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.ProductPromotionDTO;
import com.example.diamondstore.entities.ProductPromotion;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductPromotionService {
    List<ProductPromotion> productPromotionList();
    ProductPromotion getProductPromotionById(int id);
    List<ProductPromotion> getListByProductId(int id);
    List<ProductPromotion> getListByPromotionId(int id);
    void createProductPromotion(ProductPromotionDTO productPromotionDTO);
    boolean deleteProductPromotions(List<Integer> productPromotionIds);
    void updateProductPromotion(ProductPromotionDTO productPromotionDTO);
    void changeStatus(ProductPromotionDTO productPromotionDTO);
}