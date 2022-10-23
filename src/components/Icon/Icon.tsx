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
  let svgWidth = 30;
  let svgHeight = 30;
  let svgFill = 'white';
  let svgStroke = 'none';

  if (className) {
    const svgStyles = className?.split(' ');
    svgWidth = parseFloat(svgStyles[0]?.slice(6)) || 30;
    svgHeight = parseFloat(svgStyles[1]?.slice(7)) || 30;
    svgFill = svgStyles[2]?.slice(5) || 'white';
    svgStroke = svgStyles[3]?.slice(7) || 'none';
  }

  return (
    <i className={
      classNames(
        'leading-4 inline-flex items-center justify-center', className
      )
    }>
      <SVGIcon
        width={svgWidth}
        height={svgHeight}
        fill={svgFill || 'currentColor'}
        stroke="none"
        className="block"
      />
    </i>
  );
}

export default Icon;
