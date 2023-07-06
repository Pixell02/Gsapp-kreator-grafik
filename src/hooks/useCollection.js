import { useState, useEffect, useRef } from 'react'
import { db } from  '../firebase/config'

// firebase imports
import { collection, onSnapshot, query, where } from 'firebase/firestore';

export const useCollection = (c, _q, _q2) => {
    const [documents, setDocuments] = useState(null);

    // set up query
    
    const q = useRef(_q).current
    const q2 = useRef(_q2).current
    useEffect(() => {
        let ref = collection(db, c)
        
        if(q) {
          ref = query(ref, where(...q)) 
        }
        if (q && _q2) {
            ref = query(ref,where(...q), where(...q2))
        }
        
        const unsub = onSnapshot(ref, (snapshot) => {
            
            let results = []
            snapshot.docs.forEach(doc => {
                results.push({...doc.data(), id: doc.id})
                
            })
            
            setDocuments(results)
        })

        return () => unsub()
    }, [c])
    return { documents }
}

