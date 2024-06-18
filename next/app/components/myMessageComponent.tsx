import { FC } from "react";

type OverlayProps = {
  msg: string;
};

const MyMessageComponent: FC<OverlayProps> = ({ msg }) => {
  return (
    <div className="flex flex-row justify-end">
      <div className="messages text-sm text-white grid grid-flow-row gap-2">
        <div className="flex items-center flex-row-reverse group">
          <p className="px-6 py-3 rounded-t-full rounded-l-full bg-blue-700 max-w-xs lg:max-w-md">
            {msg}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyMessageComponent;
