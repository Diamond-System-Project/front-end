package com.example.diamondstore.services.interfaces;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import jakarta.persistence.Id;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CollectionService {
    Collection createCollection(CollectionDTO collectionDTO);

    //Get all Collection

    // Update Collection


    void deleteCollection(Integer collectionId);

    List<Collection> getCollectionByName(String name);

    Collection addProductToCollection(CollectionProductDTO collectionProductDTO);

    void removeProductFromCollection(Integer collectionId, Integer productId);

    Collection updateCollection(Integer collectionId, CollectionDTO collectionDTO);

    List<Collection> getAllCollection();


    List<Product> getProductsInCollection(Integer ProductId);

    List<Collection> getCollectionsOfProduct(Integer CollectionId);


}
