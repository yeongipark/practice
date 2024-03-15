import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "../css/util/Spin.css";
export default function Spin() {
  return <FontAwesomeIcon className="spin" icon={faSpinner} />;
}
