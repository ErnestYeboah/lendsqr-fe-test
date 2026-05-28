import { useEffect, useState } from "react";
import { cn } from "../utils/clsx_merge";
import { IoMdClose } from "react-icons/io";

const InternetStatusBar = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isVisible, setIsVisible] = useState(!navigator.onLine);

  useEffect(() => {
    let hideTimeout: ReturnType<typeof setTimeout>;

    const handleOnline = () => {
      setIsOnline(true);
      setIsVisible(true);
      hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1500);
    };

    const handleOffline = () => {
      clearTimeout(hideTimeout);
      setIsOnline(false);
      setIsVisible(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      clearTimeout(hideTimeout);
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed top-0 grid grid-cols-[1fr_auto] justify-between left-0 right-0 z-200 text-center p-(--gap)  text-(--text-color)",
        isOnline ? "bg-green-300" : "bg-red-300",
      )}
    >
      <p className="justify-self-center text-(length:--step--1)">
        {isOnline
          ? "Connected"
          : "You are not connected to the internet , please check your connection"}
      </p>
      <IoMdClose onClick={() => setIsVisible(false)} />
    </div>
  );
};

export default InternetStatusBar;
