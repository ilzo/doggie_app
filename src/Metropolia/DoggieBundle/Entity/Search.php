<?php

namespace Metropolia\DoggieBundle\Entity;


class Search
{
    protected $search;
    
    protected $location;
    
    protected $categoryChoice;
    
    public function getSearch()
    {
        return $this->search;
    }

    public function setSearch($search)
    {
        $this->search = $search;
    }
    
    public function getLocation()
    {
        return $this->location;
    }

    public function setLocation($location)
    {
        $this->location = $location;
    }
    
    public function getCategoryChoice()
    {
        return $this->categoryChoice;
    }

    public function setCategoryChoice($categoryChoice)
    {
        $this->categoryChoice = $categoryChoice;
    }

}