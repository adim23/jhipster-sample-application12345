package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Files;
import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data JPA repository for the Files entity.
 */
@Repository
public interface FilesRepository extends JpaRepository<Files, Long>, JpaSpecificationExecutor<Files> {
    @Query("select files from Files files where files.createdBy.login = ?#{principal.username}")
    List<Files> findByCreatedByIsCurrentUser();

    default Optional<Files> findOneWithEagerRelationships(Long id) {
        return this.findOneWithToOneRelationships(id);
    }

    default List<Files> findAllWithEagerRelationships() {
        return this.findAllWithToOneRelationships();
    }

    default Page<Files> findAllWithEagerRelationships(Pageable pageable) {
        return this.findAllWithToOneRelationships(pageable);
    }

    @Query(
        value = "select distinct files from Files files left join fetch files.parent left join fetch files.createdBy",
        countQuery = "select count(distinct files) from Files files"
    )
    Page<Files> findAllWithToOneRelationships(Pageable pageable);

    @Query("select distinct files from Files files left join fetch files.parent left join fetch files.createdBy")
    List<Files> findAllWithToOneRelationships();

    @Query("select files from Files files left join fetch files.parent left join fetch files.createdBy where files.id =:id")
    Optional<Files> findOneWithToOneRelationships(@Param("id") Long id);
}
