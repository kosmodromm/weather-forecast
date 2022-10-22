import React, { useCallback, useMemo } from 'react';

interface IProps {
  text: string,
  onClick: (city: string) => void;
}

const StyledButton: React.FC<IProps> = ({ text, onClick }) => {
  // format prop text into beauty capitalized text
  const formattedText = useMemo(() => {
    const newText = text.trim().toLowerCase();
    return newText[0].toUpperCase() + newText.substring(1);
  },[]);

  const handleClick = useCallback(() => {
    onClick(formattedText)
  }, [formattedText])

  return (
    <button type="button"
            className="px-6
                      py-2.5
                      bg-orange-100
                      text-gray-900
                      font-medium
                      text-xs
                      leading-tight
                      uppercase
                      rounded
                      shadow-md
                      min-w-[320px]
                      hover:bg-orange-200
                      hover:shadow-lg
                      focus:bg-orange-200
                      focus:shadow-lg
                      focus:outline-none
                      focus:ring-0
                      active:bg-orange-300
                      active:shadow-lg
                      transition
                      duration-150
                      ease-in-out"
            onClick={handleClick}
    >
      {formattedText}
    </button>
  );
}

export default StyledButton;
