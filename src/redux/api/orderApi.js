import { baseApi } from "./baseApi";
export const orderApi = baseApi.injectEndpoints({
	endpoints: (build) => ({
		createOrder: build.mutation({
			query: (data) => ({
				url: "/orders",
				method: "POST",
				data
			}),
			invalidatesTags: ['order'],
		}),
		createPOSOrder: build.mutation({
			query: (data) => ({
				url: "/orders/pos",
				method: "POST",
				data
			}),
			invalidatesTags: ['order'],
		}),
		getAllOrders: build.query({
			query: (arg) => ({
				url: "/orders",
				method: "GET",
				params: arg,
			}),
			providesTags: ['order'],
		}),
		getOrdersReports: build.query({
			query: (arg) => ({
				url: "/orders/reports",
				method: "GET",
				params: arg,
			}),
			providesTags: ['order'],
		}),
		getProductWiseSalesReport: build.query({
			query: (arg) => ({
				url: "/orders/product-sales-report",
				method: "GET",
				params: arg,
			}),
			providesTags: ['order'],
		}),
		getAllOrderStatus: build.query({
			query: (arg) => ({
				url: "/order-status",
				method: "GET",
				params: arg,
			}),
			providesTags: ['order'],
		}),
		changeOrderStatus: build.mutation({
			query: (arg) => ({
				url: `/orders/change-status/`,
				method: "PATCH",
				data:arg
			}),
			invalidatesTags: ['order'],
		}),
		changeHoldOrderStatus: build.mutation({
			query: (arg) => ({
				url: `/orders/change-hold-status`,
				method: "PATCH",
				data:arg
			}),
			invalidatesTags: ['order'],
		}),
		returnOrders: build.mutation({
			query: (arg) => ({
				url: `/orders/return`,
				method: "PATCH",
				data:arg
			}),
			invalidatesTags: ['order'],
		}),
		deliveryPartnerReport: build.query({
			query: (arg) => ({
				url: `/orders/delivery-partner-report`,
				method: "GET",
				params:arg
			}),
			providesTags: ['order'],
		}),
		getOrdersLogs: build.query({
			query: (arg) => ({
				url: `/orders/logs/${arg?.id}`,
				method: "GET"
			}),
			providesTags: ['order'],
		}),
		getOrderById: build.query({
			query: (arg) => ({
				url: `/orders/${arg.id}`,
				method: "GET",
			}),
			providesTags: ['order'],
		}),
		updateOrder: build.mutation({
			query: (data) => ({
				url: `/orders/${data?.id}`,
				method: "PATCH",
				data: data?.data,
			}),
			invalidatesTags: ['order'],
		}),
		addPayment: build.mutation({
			query: (data) => ({
				url: `/orders/payment/${data?.id}`,
				method: "POST",
				data: data?.data,
			}),
			invalidatesTags: ['order'],
		}),
	
	}),
});

export const {
	useGetAllOrdersQuery,
	useGetOrderByIdQuery,
	useLazyGetOrderByIdQuery,
	useUpdateOrderMutation,
	useGetAllOrderStatusQuery,
	useCreateOrderMutation,
	useAddPaymentMutation,
	useChangeOrderStatusMutation,
	useGetOrdersLogsQuery,
	useChangeHoldOrderStatusMutation,
	useReturnOrdersMutation,
	useCreatePOSOrderMutation,
	useLazyGetAllOrdersQuery,
	useLazyGetOrdersReportsQuery,
	useLazyGetProductWiseSalesReportQuery,
	useDeliveryPartnerReportQuery,
	useLazyDeliveryPartnerReportQuery
} = orderApi;
