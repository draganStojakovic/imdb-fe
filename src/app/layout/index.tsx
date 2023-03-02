import { Header } from "app/common/Header";

interface Props {
  children: React.ReactNode;
}

const Pages = ({ children }: Props) => {
  return (
    <>
      <div>
        <Header />
        <br />
        <br />
        <div className="mx-5">{children}</div>
      </div>
    </>
  );
};

export default Pages;
