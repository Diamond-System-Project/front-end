package com.example.diamondstore.services;

import com.example.diamondstore.dto.CollectionDTO;
import com.example.diamondstore.dto.CollectionProductDTO;
import com.example.diamondstore.entities.CollectionProducts;
import com.example.diamondstore.entities.Collection;
import com.example.diamondstore.entities.Product;
import com.example.diamondstore.repositories.CollectionProductRepository;
import com.example.diamondstore.repositories.CollectionRepository;
import com.example.diamondstore.repositories.ProductRepository;
import com.example.diamondstore.services.interfaces.CollectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class CollectionServiceImpl implements CollectionService {

    @Autowired
    private CollectionRepository collectionRepository;

    @Autowired
    private CollectionProductRepository collectionProductRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public Collection createCollection(CollectionDTO collectionDTO) {
        Collection collection = Collection.builder()
                .collectionName(collectionDTO.getName())
                .description(collectionDTO.getDescription())
                .build();
        return collectionRepository.save(collection);
    }

    @Override
    public void deleteCollection(Integer collectionId) {
        collectionRepository.deleteById(collectionId);
    }
    //kiểm tra lại

    @Override
    public List<Collection> getCollectionByName(String name) {
        return collectionRepository.findCollectionsByCollectionName(name);
    }

    @Override
    public Collection addProductToCollection(CollectionProductDTO collectionProductDTO) {
        Collection collection = collectionRepository.findById(collectionProductDTO.getCollectionId())
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));
        Product product = productRepository.findById(collectionProductDTO.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));


        boolean exists = collectionProductRepository.existsByCollectionIdAndProductId(collection, product);
        if (exists) {
            throw new IllegalArgumentException("Product already exists in the collection");
        }

        CollectionProducts collectionProducts = CollectionProducts.builder()
                .collectionId(collection)
                .productId(product)
                .build();

        collectionProductRepository.save(collectionProducts);

        return collection;
    }

    @Override
    @Transactional
    public void removeProductFromCollection(Integer collectionId, Integer productId) {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        collectionProductRepository.deleteByCollectionIdAndProductId(collection, product);
    }

    @Override
    @Transactional
    public Collection updateCollection(Integer collectionId, CollectionDTO collectionDTO) {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));

        collection.setCollectionName(collectionDTO.getName());
        collection.setDescription(collectionDTO.getDescription());

        return collectionRepository.save(collection);
    }


    @Override
    public List<Collection> getAllCollection() {
        return collectionRepository.findAll();
    }


    @Override
    public List<Product> getProductsInCollection(Integer collectionId) {
        Collection collection = collectionRepository.findById(collectionId)
                .orElseThrow(() -> new IllegalArgumentException("Collection not found"));

        List<CollectionProducts> collectionProductsList = collectionProductRepository.findProductByCollectionId(collection);
        List<Product> products = new ArrayList<>();
        for (CollectionProducts cp : collectionProductsList) {
            products.add(cp.getProductId());
        }
        return products;
    }

    @Override
    public List<Collection> getCollectionsOfProduct(Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        List<CollectionProducts> collectionProductsList = collectionProductRepository.findCollectionByProductId(product);
        List<Collection> collections = new ArrayList<>();
        for (CollectionProducts cp : collectionProductsList) {
            collections.add(cp.getCollectionId());
        }
        return collections;
    }

}
