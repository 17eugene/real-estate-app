import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export const useNotifications = () => {
  const [isActiveNotification, setIsActiveNotification] = useState(false);
  const [notificationStatusInfo, setNotificationStatusInfo] = useState({
    message: "",
    statusCode: null,
  });

  const navigate = useNavigate();

  const showNotificationByStatusCode = useCallback(
    (options) => {
      setIsActiveNotification(true);
      setNotificationStatusInfo({
        message: options?.result?.payload?.message,
        statusCode: options?.result?.payload?.code,
      });
      if (options?.result?.payload?.code === 201) {
        setTimeout(() => {
          setIsActiveNotification(false);
          setNotificationStatusInfo(null);
          navigate(`/${options?.offerType}`);
        }, 2000);
      } else {
        setTimeout(() => {
          setIsActiveNotification(false);
          setNotificationStatusInfo(null);
        }, 2000);
      }
    },
    [navigate]
  );

  return {
    showNotificationByStatusCode,
    isActiveNotification,
    notificationStatusInfo,
  };
};
