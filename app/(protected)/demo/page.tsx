import { redirect } from "next/navigation";

const DemoPage = () => {
  redirect("/demo/server");
  return <></>;
};

export default DemoPage;
