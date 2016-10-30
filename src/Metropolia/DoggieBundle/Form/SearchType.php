<?php

namespace Metropolia\DoggieBundle\Form;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;


class SearchType extends AbstractType
{
    /**
     * @param FormBuilderInterface $builder
     * @param array $options
     */
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder->add(
        $builder->create('search', TextType::class, array(
                        'required' => false,
                        'trim' => true,
                        'empty_data'  => null,
                        'label' => false)
                        ));
        
        $builder->add('categoryChoice', ChoiceType::class, array(
            'choices' => array('Pet store' => 'pet_store', 'Veterinary clinic' => 'veterinary_clinic', 'Dog park' => 'dog_park' ),
            'expanded' => true,
            'multiple' => true,
            'label' => false
        ));
        
    }
    
    /**
     * @param OptionsResolverInterface $resolver
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Metropolia\DoggieBundle\Entity\Search'
        ));
    }
    

    /**
     * @return string
     */
    public function getName()
    {
        return 'search';
    }
}
