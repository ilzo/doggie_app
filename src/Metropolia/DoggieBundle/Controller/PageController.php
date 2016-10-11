<?php

namespace Metropolia\DoggieBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;

//use Randomsoft\VisionsourceBundle\Entity\Mode;
//use Randomsoft\VisionsourceBundle\Form\ModeType;

class PageController extends Controller
{
    public function indexAction(Request $request){
        
        /*
        $mode = new Mode();
        $form = $this->createForm(new ModeType(), $mode, array(
            'action' => $this->generateUrl('MetropoliaDoggieBundle_home'),
            'method' => 'POST',
        ));
        */

        //$request->isXmlHttpRequest();
        if ($request->isMethod('POST')) {
            
            
          return $this->render('MetropoliaDoggieBundle:Page:index.html.twig', array(
                'form' => $form->createView()
            ));
   
        }
        
        
   return $this->render('MetropoliaDoggieBundle:Page:index.html.twig');     
        
    
}
    
}
