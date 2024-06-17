import { FC, MouseEventHandler } from "react";

type OverlayProps = {
  isVisible: boolean;
  onClick: MouseEventHandler<HTMLDivElement>; // Type của prop onClick
};

const Overlay: FC<OverlayProps> = ({ isVisible, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 bg-black opacity-50 z-30 lg:hidden ${
        isVisible ? "block" : "hidden"
      }`}
    />
  );
};

export default Overlay;
