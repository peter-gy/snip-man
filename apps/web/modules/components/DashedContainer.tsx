import { PropsWithChildren } from 'react';

type DashedContainerProps = {
  title: string;
};

function DashedContainer({
  title,
  children,
}: PropsWithChildren<DashedContainerProps>) {
  return (
    <div className="p-4 border-2 border-black border-dashed rounded-lg flex flex-col items-center">
      <h2 className="text-xl">{title}</h2>
      {children}
    </div>
  );
}

export default DashedContainer;
