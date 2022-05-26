// Import React Modules
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
// Import Firebase Modules
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
// Import Assets
import googleIcon from '../assets/svg/googleIcon.svg';

function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesn't exist, create user. Else, redirect to sign in
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
        navigate('/');
      } else {
        toast.info('User account exists with email. Please sign in with email instead.');
        navigate('/sign-in');
      }
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  }

  return <div className="socialLogin">
    <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} 
      &nbsp;with&nbsp;</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="Google" />
      </button>
  </div>
}

export default OAuth;