<?php

namespace Metropolia\DoggieBundle\Entity;


class Search
{
    protected $search;
    
    protected $categoryChoice;
    
    public function getSearch()
    {
        return $this->search;
    }

    public function setSearch($search)
    {
        $this->search = $search;
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