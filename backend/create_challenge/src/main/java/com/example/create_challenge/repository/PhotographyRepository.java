package com.example.create_challenge.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.create_challenge.entity.Photography;

@Repository
public interface PhotographyRepository extends JpaRepository<Photography, Long>{


}
