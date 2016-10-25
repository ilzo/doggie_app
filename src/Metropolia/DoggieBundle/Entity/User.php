<?php

namespace Metropolia\DoggieBundle\Entity;

use Symfony\Component\HttpFoundation\File\UploadedFile;
use Symfony\Component\Security\Core\Util\SecureRandom;
use FOS\UserBundle\Model\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

//'user' is a reserverd keyword in SQL standard. If a reserved keyword is used, it has to be escaped with `` 

/**
 * @ORM\Entity(repositoryClass="Metropolia\DoggieBundle\Entity\Repository\UserRepository")
 * @ORM\Table(name="fos_user")
 * @ORM\HasLifecycleCallbacks
 */
class User extends BaseUser
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;
    
   /**
    * @Assert\Length(
    *      max = 200,
    *      maxMessage = "Description cannot contain more than {{ limit }} characters!"
    * )
    */
    protected $description;
    
     public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }
    
    public function getDescription()
    {
        return $this->description;
    }
    
    
    public function getExpiresAt() {
        return $this->expiresAt;
    }
    
    public function getCredentialsExpireAt() {
        return $this->credentialsExpireAt;
    }
    
    
    public function __construct()
    {
        parent::__construct();
        
    }
    
}