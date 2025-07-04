const ItemWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`w-full border-2 border-white rounded-2xl flex justify-between items-center py-3 px-5 transition-all duration-300 ${className}`}
    >
      {children}
    </div>
  );
};

export default ItemWrapper;
