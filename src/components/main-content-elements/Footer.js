import React from 'react';
import './mainfooter.css';
import { Link } from 'react-router-dom';
import { useLanguageContext } from '../../context/LanguageContext';

export default function MainFooter() {
  const { language } = useLanguageContext();
  return (
    <div className="d-flex w-100 justify-content-center rules-footer">
      <span>
        <span>All rights reserved © 2023</span>
        <a href="https://firebasestorage.googleapis.com/v0/b/poster-dd714.appspot.com/o/pdfy%2Fregulamin.pdf?alt=media&token=2d64a1f3-3cb1-4f53-acf5-1cb44e9b4121">
          {' '}
          Regulamin{' '}
        </a>
        |<Link to={`/${language}/dataPrivacy`}> Polityka prywatności</Link>
      </span>
    </div>
  );
}
