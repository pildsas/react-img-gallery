<?php

namespace App\Repository;

use App\Entity\Image;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;
use Knp\Component\Pager\PaginatorInterface;

/**
 * @method Image|null find($id, $lockMode = null, $lockVersion = null)
 * @method Image|null findOneBy(array $criteria, array $orderBy = null)
 * @method Image[]    findAll()
 * @method Image[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ImageRepository extends ServiceEntityRepository
{
    public function __construct(
        ManagerRegistry $registry,
        PaginatorInterface $paginator
    ) {
        parent::__construct($registry, Image::class);
        $this->paginator = $paginator;
    }

    public function findPaginated($page = 1)
    {
        $qb = $this->createQueryBuilder("i")->orderBy("i.createdAt", "ASC");

        

        $pagination = $this->paginator->paginate($qb, $page, 7);
        return $pagination;
    }
}
