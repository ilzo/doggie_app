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
        
        
        $builder->add(
        $builder->create('location', TextType::class, array(
                        'required' => false,
                        'trim' => true,
                        'empty_data'  => null,
                        'label' => false)
                        ));
        
        $builder->add('radius', ChoiceType::class, array(
            'choices'  => array(
                'Search within a radius of ...' => null,
                'Search within a radius of 1 km' => '1000',
                'Search within a radius of 2 km' => '2000',
                'Search within a radius of 5 km' => '5000',
                'Search within a radius of 10 km' => '10000',
                'Search within a radius of 20 km' => '20000'
            ),
            'expanded' => false,
            'multiple' => false,
            'label' => false
        ));
        
        $builder->add('categoryChoice', ChoiceType::class, array(
            'choices' => array('Pet store' => 'pet_store', 'Veterinary clinic' => 'veterinary_care', 'Dog park' => 'dog_park', 'Dog trainer' => 'dog_trainer'),
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
