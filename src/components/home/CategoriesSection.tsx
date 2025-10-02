import { getCategories } from '@/api/services/categories.service';
import { ICategory } from '@/interfaces/category.interface';
import React from 'react'
import CategoriesSlider from './CategoriesSlider';
import SectionTitle from '../shared/SectionTitle';
import { Separator } from '@/components/ui/separator';


export default async function CategoriesSection() {


const {data:categories}:{data:ICategory[]}=await getCategories();

  return (
<section className='px-40 pb-20'>
    <div className="container mx-auto">
      <SectionTitle title='Categories' subtitle='Browse By Category'/>
     <CategoriesSlider categories={categories} />
     <Separator />

    </div>
</section>
  )
}
