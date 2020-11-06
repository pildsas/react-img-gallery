<?php

namespace App\Controller;

use App\Entity\Image;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;

class FrontController extends AbstractController
{
    /**
     * @Route("/", name="main_page")
     */
    public function index(): Response
    {
        return $this->render('front/index.html.twig', []);
    }

    /**
     * @Route("/gallery", name="gallery")
     */
    public function gallery(Request $request)
    {
        $page = $request->query->get('page') ? $request->query->get('page') : 1;
        $em = $this->getDoctrine()->getManager();
        $images = $em->getRepository(Image::class)->findPaginated($page);

        $serializer = SerializerBuilder::create()->build();
        $gallery = $serializer->toArray(
            $images->getItems(),
            SerializationContext::create()
                ->setSerializeNull(true)
                // ->setGroups(array('post'))
                ->enableMaxDepthChecks()
        );

        $pagination = [];
        $pagination['totalCount'] = $images->getTotalItemCount();
        $pagination['numItemsPerPage'] = $images->getItemNumberPerPage();
        $pagination['currentPageNumber'] = $images->getCurrentPageNumber();
        $pagination['count'] = $images->count();

        return $this->json(['gallery' => $gallery, 'pagination' => $pagination]);
    }
}
