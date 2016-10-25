<?php
namespace Metropolia\DoggieBundle\EventListener;

use FOS\UserBundle\FOSUserEvents;
use FOS\UserBundle\Event\FormEvent;
use Metropolia\DoggieBundle\Mailer\MyAwesomeMailer;
use FOS\UserBundle\Util\TokenGeneratorInterface;
use FOS\UserBundle\Event\FilterUserResponseEvent;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Session\SessionInterface;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;
//use FOS\UserBundle\EventListener\EmailConfirmationListener as BaseListener;


class EmailConfirmationListener implements EventSubscriberInterface
{
    /** @var \Metropolia\DoggieBundle\Mailer\MyAwesomeMailer */
    private $mailer;
    
    /** @var \FOS\UserBundle\Util\TokenGeneratorInterface */
    private $tokenGenerator;
    
    /** @var \Symfony\Component\Routing\Generator\UrlGeneratorInterface */
    private $router;
    
    /** @var \Symfony\Component\HttpFoundation\Session\SessionInterface */
    private $session;
    
    /**
	 * Constructor
	 * 
	 * @param MyAwesomeMailer $mailer
	 * @param TokenGeneratorInterface $tokenGenerator
     * @param UrlGeneratorInterface $router
     * @param SessionInterface $session
	 */
    public function __construct(MyAwesomeMailer $mailer, TokenGeneratorInterface $tokenGenerator, UrlGeneratorInterface $router, SessionInterface $session)
    {
        $this->mailer = $mailer;
        $this->tokenGenerator = $tokenGenerator;
        $this->router = $router;
        $this->session = $session;
    }

    public static function getSubscribedEvents()
    {
        return array(
            FOSUserEvents::REGISTRATION_SUCCESS => "onRegistrationSuccess",
            FOSUserEvents::REGISTRATION_CONFIRMED => 'sendUserNotificationEmail'
            /*FOSUserEvents::REGISTRATION_CONFIRMED => 'notifyAdmin' */
        );
    }
    
      public function onRegistrationSuccess(FormEvent $event)
    {
        
        $rolesArr = array('ROLE_USER');
        
        /** @var $user \FOS\UserBundle\Model\UserInterface */
        $user = $event->getForm()->getData();
        $user->setRoles($rolesArr);
          
        $user->setEnabled(false);
        if (null === $user->getConfirmationToken()) {
            $user->setConfirmationToken($this->tokenGenerator->generateToken());
        }
        
    }
    
    public function sendUserNotificationEmail(FilterUserResponseEvent $event, $eventName = null, EventDispatcherInterface $eventDispatcher = null)
    {
        $user = $event->getUser();
        
        if (!$user->isEnabled()) {
            return;
        }

        if (null === $eventDispatcher) {
            $eventDispatcher = $event->getDispatcher();
        }

        $this->mailer->sendNotificationEmailMessage($user);
    }
    
    /*
    
     public function notifyAdmin(FilterUserResponseEvent $event, $eventName = null, EventDispatcherInterface $eventDispatcher = null)
    {
        $user = $event->getUser();
        
        if (!$user->isEnabled()) {
            return;
        }

        if (null === $eventDispatcher) {
            $eventDispatcher = $event->getDispatcher();
        }

        $this->mailer->sendAdminNotificationMessage($user);
    }
    */
    
}