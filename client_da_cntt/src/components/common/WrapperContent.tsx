import React from "react";

interface WrapperContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const WrapperContent: React.FC<WrapperContentProps> = ({
  children,
  className = "",
  ...props
}) => {
  return (
    <div className={`lg:pl-[5%] lg:pr-[5%] ${className}`} {...props}>
      {children}
    </div>
  );
};

export default WrapperContent;
