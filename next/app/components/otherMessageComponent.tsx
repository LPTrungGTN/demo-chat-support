import { FC } from "react";

type OverlayProps = {
  msg: string;
};

const OtherMessageComponent: FC<OverlayProps> = ({ msg }) => {
  return (
    <div className="flex flex-row justify-start">
      <div className="messages text-sm text-gray-700 grid grid-flow-row gap-2">
        <div className="flex items-center group">
          <p className="px-6 py-3 rounded-t-full rounded-r-full bg-gray-800 max-w-xs lg:max-w-md text-gray-200">
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OtherMessageComponent;
