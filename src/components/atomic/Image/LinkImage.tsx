import { Link } from "react-router";
import defaultLogo from "../../../assets/logo.svg";

interface LinkImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  href?: string;
}

const LinkImage = ({
  src = defaultLogo,
  alt = "Logo",
  width = 60,
  height = 40,
  href = "/panel",
}: LinkImageProps) => {
  return (
    <Link to={href}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </Link>
  );
};

export default LinkImage;
