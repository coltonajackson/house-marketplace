// Import React Modules
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Import Image Assets
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg';
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg';
// Import Components
import Spinner from '../components/Spinner';
import Slider from '../components/Slider';

function Explore() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, []);

  return loading ? <Spinner /> : (
    <div className="explore">
      <header>
        <p className="pageHeader">Explore</p>
      </header>
      <main>
        <Slider />
        <p className="exploreCategoryHeading">Categories</p>
        <div className="exploreCategories">
          <Link to='/category/rent'>
            <img src={rentCategoryImage} alt="rent" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for rent</p>
          </Link>
          <Link to='/category/sale'>
            <img src={sellCategoryImage} alt="rent" className='exploreCategoryImg' />
            <p className="exploreCategoryName">Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore;