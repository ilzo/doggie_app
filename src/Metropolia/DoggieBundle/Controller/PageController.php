<?php

namespace Metropolia\DoggieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Metropolia\DoggieBundle\Entity\Search;
use Metropolia\DoggieBundle\Form\SearchType;

class PageController extends Controller
{
    public function indexAction(Request $request){
        
       
        
        $search = new Search();
        $form = $this->createForm(SearchType::class, $search, array(
            'action' => $this->generateUrl('MetropoliaDoggieBundle_home'),
            'method' => 'POST',
        ));

        
        if ($request->isMethod('POST')) {
            
            $form->handleRequest($request);
            $searchData = $form->getData();
            
            
            if (($form->isSubmitted())) {
                
                $response = $this->forward('MetropoliaDoggieBundle:Page:results', array(
                    'input' => $searchData->getSearch(),
                    'categories' => $searchData->getCategoryChoice()
                ));
                
                return $response;
                return $this->redirect($this->generateUrl('MetropoliaDoggieBundle_home'));
                
            }
            
        }
        
      return $this->render('MetropoliaDoggieBundle:Page:index.html.twig', array(
            'form' => $form->createView()
        ));
        
         /*
        
        
        if ($request->isMethod('POST')) {
            
            
          return $this->render('MetropoliaDoggieBundle:Page:index.html.twig', array(
                'form' => $form->createView()
            ));
   
        }
        return $this->render('MetropoliaDoggieBundle:Page:index.html.twig');
        
        */
        
        
}
    
    
public function resultsAction($input, $categories){
    
    dump($input);
    dump($categories);
    
    return $this->render('MetropoliaDoggieBundle:Page:results.html.twig', array(
        'input' => $input,
        'categories' => $categories
    ));  
}
    
}
