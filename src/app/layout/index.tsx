import { Header } from "../common/Header";

const Pages = ({ children }: any) => {
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
