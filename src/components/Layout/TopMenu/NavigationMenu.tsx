import { Stack, } from "@mui/material";
import { LinkItem } from "../../../models/LinkItem";
import {Link} from "react-router"

interface NavigationMenuProps {
  links: LinkItem[];
}

const NavigationMenu = (props: NavigationMenuProps) => {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
      {props.links.map((link) => (
        <Link key={link.title} to={link.path}>
          {link.title}
        </Link>
      ))}
    </Stack>
  );
};

export default NavigationMenu;
