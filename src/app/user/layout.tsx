import React from "react";

const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex flex-col p-6">
      <h1 className="text-3xl text-fuchsia-400">User</h1>
      <div>{children}</div>
    </div>
  );
};

export default layout;
