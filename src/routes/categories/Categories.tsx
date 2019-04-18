import React, { useState, useEffect } from 'react';

import { getCategories } from '../../api/index';
import { ICategory } from '../../api/types';

import Categories from '../../components/categories/Categories';
import Spinner from '../../components/spinner/Spinner';

export default function CategoriesRoute() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const cats = await getCategories();
      setCategories(cats.data);
      setLoading(false);
    }
    fetch();
  })

  if (loading) return <Spinner />

  return (
    <Categories categories={categories} />
  );
}
