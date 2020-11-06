<?php

namespace App\Controller;

use App\Entity\Image;
use App\Utils\Interfaces\UploaderInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use JMS\Serializer\SerializationContext;
use JMS\Serializer\SerializerBuilder;
use Symfony\Component\HttpFoundation\File\File;
use Symfony\Component\HttpFoundation\Request;

class UploadFileController extends AbstractController
{
    /**
     * @Route("/upload-file", name="upload_file")
     */
    public function index(
        Request $request,
        UploaderInterface $uploader
    ): Response {
        if ($request->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getManager();

            if (isset($_FILES['file'])) {
                $file = new File($_FILES['file']['tmp_name']);
                $fileName = $uploader->upload($file);
                $image = new Image();
                $image->setPath(Image::gallery . $fileName);
                $image->setName($fileName);
                $em->persist($image);
                $em->flush();

                $images = $em->getRepository(Image::class)->findPaginated($request->request->get('page'));
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

                return $this->json(['gallery' => $gallery, 'pagination' => $pagination]);
            }

            return $this->json(['success' => false]);
        }

        return $this->json(['ajax' => 'only']);
    }

    /**
     * @Route("/remove-file", name="remove_file")
     */
    public function remove(
        Request $request,
        UploaderInterface $uploader
    ): Response {
        if ($request->isXmlHttpRequest()) {
            $em = $this->getDoctrine()->getManager();
            $id = $request->request->get('id');
            $img = $em->getRepository(Image::class)->findOneBy(['id' => $id]);
            $em->remove($img);
            $uploader->delete($img->getPath());
            $em->flush();

            return $this->json(['id' => $id]);
        }

        return $this->json(['ajax' => 'only']);
    }
}

