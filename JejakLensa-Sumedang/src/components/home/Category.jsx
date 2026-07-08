import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { id: 1, name: 'Semua spot', icon: 'fa-th-large', active: true },
  { id: 2, name: 'Alam', icon: 'fa-mountain' },
  { id: 3, name: 'Sejarah', icon: 'fa-landmark' },
  { id: 4, name: 'Kuliner', icon: 'fa-utensils' },
  { id: 5, name: 'Religi', icon: 'fa-place-of-worship' },
  { id: 6, name: 'Buatan', icon: 'fa-city' }
];

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName) => {
    if (categoryName === 'Semua spot') {
      navigate('/search');
    } else {
      const slug = categoryName.toLowerCase();
      navigate(`/search?category=${slug}`);
    }
  };

  return (
    <section className="category-pills">
      <div className="container">
        <div className="cat-row">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className={`cat-pill ${cat.active ? 'active' : ''}`}
              onClick={() => handleCategoryClick(cat.name)}
            >
              <i className={`fas ${cat.icon}`}></i>
              {cat.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Category;