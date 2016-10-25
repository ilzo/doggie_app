<?php

namespace Metropolia\DoggieBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use FOS\UserBundle\Event\GetResponseUserEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class PasswordChangeListener implements EventSubscriberInterface {
    
    private $router;

    public function __construct(UrlGeneratorInterface $router) {
        $this->router = $router;
    }

    public static function getSubscribedEvents() {
        return array(
            FOSUserEvents::CHANGE_PASSWORD_INITIALIZE => 'onPasswordChangeInitialize',
            FOSUserEvents::CHANGE_PASSWORD_SUCCESS => 'onPasswordChangeSuccess',
            FOSUserEvents::CHANGE_PASSWORD_COMPLETED => 'onPasswordChangeCompleted'
        );
    }

    public function onPasswordChangeCompleted(FilterUserResponseEvent $event) {
        $url = $this->router->generate('MetropoliaDoggieBundle_profile_settings');
        $event->setResponse(new RedirectResponse($url));
        
           
    }
    
    public function onPasswordChangeSuccess(FormEvent $event) {
        
        $url = $this->router->generate('MetropoliaDoggieBundle_profile_settings');
        $event->setResponse(new RedirectResponse($url));
        
        
        
    }
    
    public function onPasswordChangeInitialize(GetResponseUserEvent $event) {
        
        //$form = $event->getForm();
        
        //$errors = $form->getErrors();
        
        $url = $this->router->generate('MetropoliaDoggieBundle_profile_settings');
        $event->setResponse(new RedirectResponse($url));
    }
    
}
