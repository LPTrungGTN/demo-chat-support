import React from "react";
import { BiSolidErrorCircle } from "react-icons/bi";

type NotificationModalProps = {
  label: string;
  messages: string[];
  onClose: () => void;
};

const NotificationModal: React.FC<NotificationModalProps> = ({
  label,
  messages,
  onClose,
}) => {
  const [progress, setProgress] = React.useState(100);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress <= 0) {
          clearInterval(interval);
          onClose();
          return 0;
        }
        return prevProgress - 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start mt-6 justify-center">
      <div className="relative z-10">
        <div className="bg-white p-4 shadow-lg rounded-b">
          <button onClick={onClose} className="absolute top-2 right-2 text-lg">
            ×
          </button>
          <div className="flex items-center mb-2 pr-4">
            <BiSolidErrorCircle className="mr-2 text-red-500 text-3xl" />
            {label}
          </div>
          <ul>
            {messages.map((msg, index) => (
              <li key={index} className="mb-1">
                {index + 1}. {msg}
              </li>
            ))}
          </ul>
        </div>
        <div
          className="bg-red-600 h-1"
          style={{
            width: `${progress}%`,
            borderBottomRightRadius: "0.375rem",
            borderBottomLeftRadius: "0.375rem",
          }}
        ></div>
      </div>
    </div>
  );
};

export default NotificationModal;
