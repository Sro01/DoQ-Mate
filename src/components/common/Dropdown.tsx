import type  { ReactElement } from 'react';
import { useState, cloneElement } from 'react';

interface DropdownProps {
  trigger: ReactElement;
  children: React.ReactNode;
  defaultOpen?: boolean;
  isCollapsed?: boolean;
}

function Dropdown({ trigger, children, defaultOpen = false, isCollapsed = false }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  // trigger에 isCollapsed와 isOpen prop을 전달
  const triggerWithProps = cloneElement(trigger, {
    isCollapsed,
    isOpen
  } as any);

  return (
    <div className="mb-2">
      <div onClick={() => !isCollapsed && setIsOpen(!isOpen)} className="cursor-pointer">
        {triggerWithProps}
      </div>
      {isOpen && !isCollapsed && <div className="ml-8 mt-1">{children}</div>}
    </div>
  );
}

export default Dropdown;
