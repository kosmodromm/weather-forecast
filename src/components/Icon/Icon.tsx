import React from 'react';
import classNames from 'classnames';

import { ReactComponent as logo } from './icons/WF-logo.svg';

const icons = {
  logo
};

export type IconName = keyof typeof icons;

interface IProps {
  name: IconName;
  className?: string;
}

const Icon: React.FC<IProps> = ({ name, className }) => {
  const SVGIcon = icons[name];

  return (
    <i className={
      classNames(
        'leading-4 inline-flex items-center justify-center', className
      )
    }>
      <SVGIcon
        className={className}
      />
    </i>
  );
}

export default Icon;
