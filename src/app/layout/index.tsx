import { Header } from "app/common/Header";
import { Box } from "@mui/system";

interface Props {
  children: React.ReactNode;
}

const Pages = ({ children }: Props) => {
  return (
    <>
      <Header />
      <Box sx={{ mx: "auto", width: 1200 }}>{children}</Box>
    </>
  );
};

export default Pages;
