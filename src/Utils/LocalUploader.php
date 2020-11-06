<?php

namespace App\Utils;

use App\Utils\Interfaces\UploaderInterface;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\Filesystem\Filesystem;
use Symfony\Component\Filesystem\Exception\IOExceptionInterface;
use Symfony\Component\HttpFoundation\File\File;

class LocalUploader implements UploaderInterface
{
    private $local_directory;

    public function __construct($local_directory)
    {
        $this->local_directory = $local_directory;
    }

    public function getLocalDirectory()
    {
        return $this->local_directory;
    }

    //uploads file and return file name for setting path
    public function upload($file)
    {
        $fileName = uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($this->getLocalDirectory(), $fileName);
        } catch (FileException $e) {
            ///////
        }

        return $fileName;
    }

    public function uploadAjax($tmp_name)
    {
        $file = new File($tmp_name);
        $fileName = uniqid() . '.' . $file->guessExtension();

        try {
            $file->move($this->getLocalDirectory(), $fileName);
        } catch (FileException $e) {
            ///////
        }

        return $fileName;
    }

    public function delete($path)
    {
        $fileSystem = new Filesystem();
        try {
            $fileSystem->remove('.' . $path);
        } catch (IOExceptionInterface $exception) {
            echo "An error occurred while deletegin your file at " .
                $exception->getPath();
        }

        return true;
    }
}
