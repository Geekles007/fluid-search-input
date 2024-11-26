'use client'

import { AnimatePresence, motion } from 'framer-motion';
import { SearchIcon, X } from 'lucide-react';
import React, { useRef, useState } from 'react';
import GooeyFilter from '../gooey-filter';
import useMeasure from 'react-use-measure';
import { cn } from '@/utils';
import useOutsideClick from '@/hooks/use-outside-click';

const SearchInput = () => {
  const [open, setOpen] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [ref, { width }] = useMeasure();
  const searchContainerRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useOutsideClick(searchContainerRef, () => {
    if (open && searchText === '') {
      setOpen(false);
    }
  });

  return (
    <>
      <GooeyFilter />
      <div className='flex h-screen top-0 w-screen absolute items-center justify-center'>
        <div
          className='flex items-center'
          ref={searchContainerRef}
          style={{ filter: 'url(#goo-effect)' }}
        >
          <motion.div
            layout
            className='relative z-10 overflow-hidden bg-black'
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ borderRadius: '20px' }}
            animate={{
              width,
            }}
          >
            <div
              className={cn(
                'flex h-12 items-center px-4',
                open ? 'w-40' : 'w-24'
              )}
              ref={ref}
            >
              {!open ? (
                <button
                  onClick={() => setOpen(true)}
                  className='w-full text-center text-sm text-gray-300'
                >
                  Search
                </button>
              ) : (
                <input
                  value={searchText}
                  onChange={handleSearch}
                  className='block w-40 bg-transparent text-sm text-white outline-none'
                  placeholder='Type to search...'
                />
              )}
            </div>
          </motion.div>
          <AnimatePresence mode='wait'>
            {open && (
              <motion.button
                animate={{
                  x: 56,
                  opacity: 1,
                }}
                exit={{
                  x: 0,
                  opacity: 0,
                  transition: { delay: 0.1, duration: 0.85 },
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.85,
                  type: 'spring',
                  bounce: 0.15,
                }}
                onClick={
                  searchText?.length > 0 ? undefined : () => setOpen(false)
                }
                whileTap={{ scale: 0.9 }}
                className='absolute right-0 flex h-12 w-12 items-center justify-center rounded-full bg-black'
              >
                <AnimatePresence mode='popLayout'>
                  {searchText?.length > 0 ? (
                    <motion.div
                      layout
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      initial={{ scale: 0, opacity: 0 }}
                    >
                      <SearchIcon size={15} color={'#fff'} />
                    </motion.div>
                  ) : (
                    <motion.div
                      layout
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0, opacity: 0 }}
                      initial={{ scale: 0, opacity: 0 }}
                    >
                      <X size={15} color={'#fff'} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SearchInput;
