import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Path from '../../constants/Path';

const SearchForm: React.FC = () => {
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const onCityChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCity(e.target.value);
  };

  const onSearch = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    navigate(`${Path.City}/${city}`);
  };

  return (
    <form className="flex items-center pb-5 min-w-[340px]" onSubmit={onSearch}>
      <label htmlFor="simple-search" className="sr-only">Search</label>
      <div className="relative w-full">
        <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
          <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor"
               viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"></path>
          </svg>
        </div>
        <input type="text" id="simple-search"
               value={city}
               onChange={onCityChange}
               className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-400 focus:border-green-400 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Search" required />
      </div>
      <button type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-green-400 rounded-lg border border-green-500 hover:bg-green-400 focus:ring-4 focus:outline-none focus:ring-green-200 dark:bg-green-300 dark:hover:bg-green-400 dark:focus:ring-green-500">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
             xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <span className="sr-only">Enter city</span>
      </button>
    </form>
  );
};

export default SearchForm;
