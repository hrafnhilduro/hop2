import React, { useState, useEffect } from 'react';

import { getCategories } from '../../api/index';
import { ICategory, IError } from '../../api/types';

import Categories from '../../components/categories/Categories';
import Spinner from '../../components/spinner/Spinner';

import NotFound from '../system-pages/NotFound';

export default function CategoriesRoute() {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<IError[]>([]);

  useEffect(() => {
    const fetch = async () => {
      await getCategories()
        .then((result) => {
          if (!result.isOk) setError(result.data);
          else setCategories(result.data);
        })
      setLoading(false);
    }
    fetch();
  })

  if (error.length > 0) return <NotFound/>
  if (loading) return <Spinner />

  return (
    <Categories categories={categories} />
  );
}
