package com.example.diamondstore.repositories;
import com.example.diamondstore.entities.Order;
import com.example.diamondstore.entities.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Order, Integer> {
    Order findByOrderId(Integer orderId);
    List<Order> findByCid(User cid);
    List<Order> findByDeliveryStaff(User delivery);
}
