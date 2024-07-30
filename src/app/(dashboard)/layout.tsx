"use client";
import Footer from "@/components/footer/Footer";
import DashboardSideBar from "@/components/homepage/DashboardSideBar";
import DashboardTopBar from "@/components/homepage/DashboardTopBar";
import Loader from "@/components/ui/loader/Loader";
import { useAuth } from "@/context/auth/authContext";
import QueryProvider from "@/context/query/QueryProvider";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { VERIFY_TOKEN } from "@/lib/graphql/queries/verifyToken";
import { LocalStorageKey } from "@/types/global";
import withPrivateRoute from "@/utils/hoc/withPrivateRoute";
import { useLazyQuery } from "@apollo/client";
import { css } from "@emotion/core";
import styled from "@emotion/styled";
import React, { useEffect } from "react";

const Layout = styled.div<{ isPadding: boolean }>(
  ({ isPadding }) => css`
    margin: 5rem 0 0 4.6rem;
    padding: ${!isPadding ? "0px 20px" : 0};
  `,
);

const DashboardLayout = ({ children }: any) => {
  const [verifyToken] = useLazyQuery(VERIFY_TOKEN);
  const { item } = useLocalStorage<LocalStorageKey>("AUTH_TOKEN");
  const { isDashboard, logout } = useAuth();
  const handleVerifyToken = async () => {
    const { data } = await verifyToken({ variables: { token: item } });
    if (!data?.verifyToken) {
      logout();
    }
  };
  useEffect(() => {
    handleVerifyToken();
  }, []);
  return (
    <>
      <QueryProvider>
        <DashboardTopBar />
        <DashboardSideBar />
        <Layout isPadding={isDashboard}>{children}</Layout>
        {isDashboard && <Footer showContent={false} />}
        <Loader />
      </QueryProvider>
    </>
  );
};

export default withPrivateRoute(DashboardLayout);
