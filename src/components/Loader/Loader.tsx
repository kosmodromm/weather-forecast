import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="w-12 h-12 rounded-full animate-spin
                    border-y border-solid border-[#FF8F40] border-t-transparent shadow-md">
    </div>
  );
};

export default Loader;
