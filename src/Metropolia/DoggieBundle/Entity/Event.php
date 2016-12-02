<?php

namespace Metropolia\DoggieBundle\Entity;

class Event
{
    
    private $name;
    
    private $startTimes;
    
    private $endTimes;
    
    private $desc_short;
    
    private $desc_long;
    
    private $images;
    
    public function getName()
    {
        return $this->name;
    }
    
    public function getStartTimes()
    {
        return $this->startTimes;
    } 
    
    public function getEndTimes()
    {
        return $this->endTimes;
    }
    
    public function getDescShort()
    {
        return $this->desc_short;
    }
    
    public function getDescLong()
    {
        return $this->desc_long;
    }
    
    public function getImages() 
    {
        return $this->images;
    }
    
    public function setName($name)
    {
        $this->name = $name;
    }
    
    public function setStartTimes($startTimes)
    {
        $this->startTimes = $startTimes;
    }
    
    public function setEndTimes($endTimes)
    {
       $this->endTimes = $endTimes; 
    }
    
    public function setDescShort($desc_short)
    {
        $this->desc_short = $desc_short;
    }
    
    public function setDescLong($desc_long)
    {
        $this->desc_long = $desc_long;
    }
    
    public function setImages($images)
    {
        $this->images = $images;
    }
     
}