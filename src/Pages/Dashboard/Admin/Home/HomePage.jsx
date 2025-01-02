import React, { useEffect, useState } from "react";
import CartsOrderSection from "../Orders/AllOrders/CartsOrderSection";
import { LoaderLogin } from "../../../../Components/Components";
import { OrdersComponent } from "../../../../Store/CreateSlices";
import { useGet } from "../../../../Hooks/useGet";
import Chart from "./Charts/Chart";

const HomePage = () => {


  const {
    refetch: refetchCountOrders,
    loading,
    data: dataCountOrders,
  } = useGet({
    url: "https://lamadabcknd.food2go.online/admin/order/count",
  });

  const {
    refetch: refetchChart,
    loading: loadingChart,
    data: dataCharts,
  } = useGet({
    url: "https://lamadabcknd.food2go.online/admin/home",
  });
  const [dataHome, setDataHome] = useState([]);
  const [order_statistics, setOrder_statistics] = useState({})
  const [earning_statistics, setEarning_statistics] = useState({})
  const [orders, setOrders] = useState({})
  const [recent_orders, setRecent_orders] = useState([])


  useEffect(() => {
    console.log("Fetching Count Orders...");
    refetchCountOrders();
    refetchChart();
  }, [refetchCountOrders, refetchChart]);

  useEffect(() => {
    if (dataCharts) {
      setDataHome(dataCharts);
      setOrder_statistics(dataCharts.order_statistics)
      setEarning_statistics(dataCharts.earning_statistics)
      setRecent_orders(dataCharts.recent_orders)
      setOrders(dataCharts.orders)

    }
    console.log("fetch data Home", dataHome);
    console.log("fetch data Home", dataCharts);
    console.log("fetch data Home stat order", dataHome.order_statistics);
    console.log("fetch data Home stat earn", dataHome.earning_statistics);
    console.log("fetch data Home stat recent", dataHome.recent_orders);
    console.log("fetch data Home stat order", order_statistics);
    // console.log("fetch data Home stat order", dataCharts.orders);

  }, [dataCharts, dataHome, order_statistics]);

  const counters = {
    ordersAll: dataCountOrders?.orders || 0,
    ordersPending: dataCountOrders?.pending || 0,
    ordersConfirmed: dataCountOrders?.confirmed || 0,
    ordersProcessing: dataCountOrders?.processing || 0,
    ordersOutForDelivery: dataCountOrders?.out_for_delivery || 0,
    ordersDelivered: dataCountOrders?.delivered || 0,
    ordersReturned: dataCountOrders?.returned || 0,
    ordersFailed: dataCountOrders?.faild_to_deliver || 0,
    ordersCanceled: dataCountOrders?.canceled || 0,
    ordersSchedule: dataCountOrders?.scheduled || 0,
  };

  return (
    <>
      <OrdersComponent />
      <div className="w-full flex flex-col mb-0">
        {loading && loadingChart ? (
          <>
            <div className="w-full flex justify-center items-center">
              <LoaderLogin />
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-col gap-7 items-start justify-center pb-16">
              <CartsOrderSection ordersNum={counters} />
              <Chart
                order_statistics={order_statistics}
                earning_statistics={earning_statistics}
                recent_orders={recent_orders}
                orders={orders}
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default HomePage;
