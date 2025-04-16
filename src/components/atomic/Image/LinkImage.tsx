import { Link } from "react-router";
import Logo from "../../../assets/MountSpa-logo.png";

interface LinkImageProps {
  src?: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  href?: string;
}

const LinkImage = ({
  src = Logo,
  alt = "Logo",
  width = 130,
  height = 70,
  href = "/panel",
}: LinkImageProps) => {
  return (
    <Link to={href}>
      <img src={src} alt={alt} width={width} height={height} loading="lazy" />
    </Link>
  );
};

export default LinkImage;
