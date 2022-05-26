// Import React Modules
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
// Import Firebase Modules
import { collection, getDocs, query, where, orderBy, limit, startAfter } 
  from 'firebase/firestore';
import { db } from '../firebase.config';
// Import Components
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

function Category() {
  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchedListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference
        const listingsRef = collection(db, 'listings');
        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        );
        // Execute query
        const querySnap = await getDocs(q);
        // Get last fetched listing
        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchedListing(lastVisible);
        // Obtain listings from firebase db
        const listings = [];
        querySnap.forEach((doc) => {
          return listings.push({
            id: doc.id,
            data: doc.data()
          });
        });
        setListings(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listings');
      }
    }
    fetchListings();
  }, [params.categoryName]);

  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings');
      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );
      // Execute query
      const querySnap = await getDocs(q);
      // Get last fetched listing
      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchedListing(lastVisible);
      // Obtain listings from firebase db
      const listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data()
        });
      });
      setListings((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listings');
    }
  }

  return (
    <div className='category'>
      <Helmet>
        <title>Places for {params.categoryName}</title>
      </Helmet>
      <header>
        <p className='pageHeader'>
          Places for {params.categoryName}
        </p>
      </header>
      {loading ? (
        <Spinner />
       ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem listing={listing.data} id={listing.id} 
                  key={listing.id} />
              ))}
            </ul>
          </main>
          <br />
          {lastFetchedListing && (
            <p className="loadMore" onClick={onFetchMoreListings}>Load More</p>
          )}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category;