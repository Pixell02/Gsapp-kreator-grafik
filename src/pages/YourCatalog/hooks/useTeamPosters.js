import { useEffect } from 'react';
import { useCollection } from '../../../hooks/useCollection';
import { useDoc } from '../../../hooks/useDoc';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { useState } from 'react';

const useTeamPosters = () => {
  const { user } = useAuthContext();
  const { documents: License } = useDoc('user', ['uid', '==', user.uid]);
  const { documents: yourPoster } = useCollection('yourCatalog', ['uid', '==', user.uid]);

  const [teamPosters, setTeamPosters] = useState(null);
  useEffect(() => {
    if (License?.team) {
      const ref = query(collection(db, 'yourCatalog'), where('uid', '==', License.team));
      onSnapshot(ref, (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setTeamPosters(results);
      });
    }
  }, [License]);

  return { yourPoster, teamPosters, License };
};

export default useTeamPosters;
