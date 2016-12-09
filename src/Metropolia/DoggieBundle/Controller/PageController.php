<?php

namespace Metropolia\DoggieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Metropolia\DoggieBundle\Entity\Search;
use Metropolia\DoggieBundle\Form\SearchType;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Component\Serializer\Normalizer\GetSetMethodNormalizer;


// PageController receives HTTP requests and returns corresponding page templates as response 

class PageController extends Controller
{
    
    // Controller method for returning index page template and for 
    // forwarding search form POST request to resultsAction method
    
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
                    'location' => $searchData->getLocation(),
                    'radius' => $searchData->getRadius(),
                    'categories' => $searchData->getCategoryChoice()
                ));
                
                return $response;
                return $this->redirect($this->generateUrl('MetropoliaDoggieBundle_home'));
                
            }
            
        }
        
      return $this->render('MetropoliaDoggieBundle:Page:index.html.twig', array(
            'form' => $form->createView()
        ));
             
}
    
// Controller method for returning search results template with form input data
    
public function resultsAction($input, $location, $radius, $categories){
    
    return $this->render('MetropoliaDoggieBundle:Page:results.html.twig', array(
        'input' => $input,
        'location' => $location,
        'radius' => $radius,
        'categories' => $categories
    ));  
}
    
    
// Controller method for returning events page  
    
public function eventsAction(Request $request){
        
        $search = new Search();
        $form = $this->createForm(SearchType::class, $search, array(
            'action' => $this->generateUrl('MetropoliaDoggieBundle_events'),
            'method' => 'POST',
        ));

        
        if ($request->isMethod('POST')) {
            
            $form->handleRequest($request);
            $searchData = $form->getData();
            
            
            if (($form->isSubmitted())) {
                
                $response = $this->forward('MetropoliaDoggieBundle:Page:results', array(
                    'input' => $searchData->getSearch(),
                    'location' => $searchData->getLocation(),
                    'radius' => $searchData->getRadius(),
                    'categories' => $searchData->getCategoryChoice()
                ));
                
                return $response;
                return $this->redirect($this->generateUrl('MetropoliaDoggieBundle_events'));
                
            }
            
        }
        
      return $this->render('MetropoliaDoggieBundle:Page:events.html.twig', array(
            'form' => $form->createView()
        ));
        
             
}
    

// Controller method for returning single event page  
    
/**
 * @Route("/events/{id}/", options={"expose"=true}, name="MetropoliaDoggieBundle_single_event")
 */  
public function showSingleEventAction(Request $request){
    
    $search = new Search();
    $form = $this->createForm(SearchType::class, $search, array(
        'action' => $this->generateUrl('MetropoliaDoggieBundle_events'),
        'method' => 'POST',
    ));
    
    if ($request->isMethod('POST')) {
        
        $form->handleRequest($request);
        $searchData = $form->getData();
        
        if (($form->isSubmitted())) {
                
            $response = $this->forward('MetropoliaDoggieBundle:Page:results', array(
                'input' => $searchData->getSearch(),
                'location' => $searchData->getLocation(),
                'radius' => $searchData->getRadius(),
                'categories' => $searchData->getCategoryChoice()
            ));

            return $response;
            return $this->redirect($this->generateUrl('MetropoliaDoggieBundle_events'));

        }
        
        $eventData = $request->get('event-object-data');
            
        $decodedData = rawurldecode($eventData);
        
        $event = json_decode($decodedData);
        
        return $this->render('MetropoliaDoggieBundle:Page:event-single.html.twig', array(
                'form' => $form->createView(), 
                'event' => $event
        ));
          
    }
    
    return $this->redirect($this->generateUrl('MetropoliaDoggieBundle_events'));
  
}      
    
    
}
