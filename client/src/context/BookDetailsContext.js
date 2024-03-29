import React, {createContext, useState, useEffect} from 'react';
import {base_url} from './../constants';

export const BookDetailsContext = createContext();

const BookDetailsContextProvider = ({children}) => {
  const book_id = window.location.pathname.split('/')[2];
  const [doneFetchBookDetails, setDoneFetchBookDetails] = useState(false);
  const [details, setDetails] = useState('');

  //useEffect
  useEffect(() => getBookDetails(book_id), [book_id])

  //fetch
  const getBookDetails = book_id => {
    fetch(`${base_url}api/book/${book_id}`)
      .then(res => res.json())
      .then(data => {
        setDoneFetchBookDetails(true)
        setDetails(data?.result)
      })
      .catch(error => console.log(error))
  }

  return(
    <BookDetailsContext.Provider value={{doneFetchBookDetails, details}}>
      {children}
    </BookDetailsContext.Provider>
  )
}

export default BookDetailsContextProvider;