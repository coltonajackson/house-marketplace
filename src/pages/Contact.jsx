// Import React Modules
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// Import Firebase Modules
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase.config';
// Import Components
import Spinner from '../components/Spinner';

function Contact() {
  const [message, setMessage] = useState('');
  const [landlord, setLandlord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const params = useParams();

  useEffect(() => {
    const getLandlord = async () => {
      console.log(params.landlordId);
      const docRef = doc(db, 'users', params.landlordId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setLandlord(docSnap.data());
        setLoading(false);
      } else {
        toast.error('Could not get landlord data');
      }
    }
    getLandlord();
  }, [params.landlordId]);

  const onChange = (e) => setMessage(e.target.value);

  return loading ? <Spinner /> : (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Contact Landlord</p>
      </header>
      {landlord !== null && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact {landlord?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">Message</label>
              <textarea name="message" id="message" className="textarea"
                value={message} onChange={onChange}></textarea>
            </div>
            <a href={`mailto:${landlord.email}?Subject=` +
              `${searchParams.get('listingName')}&body=${message}`}>
                <button type='button' className="primaryButton">Send Message</button>
              </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact;