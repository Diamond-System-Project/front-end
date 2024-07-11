import { notification } from "antd";
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const openNotificationWithIcon = (type, title, description) => {
  notification[type]({
    message: title,
    description: description,
  });
};

export default openNotificationWithIcon;
