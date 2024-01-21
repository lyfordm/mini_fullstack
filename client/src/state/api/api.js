import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({baseUrl: import.meta.env.VITE_APP_URL})

export const Api = createApi({
    baseQuery:baseQuery,
    reducerPath: "Api",
    tagTypes: ["FAQ", "FAQs", "Services", "Service"],
    endpoints: (builder) => ({
        // faq endpoints
        getFAQ: builder.query({
            query: (id) => `/api/faqs/view/${id}`,
            providesTags: ["FAQ"]
        }),
        getAllFAQS: builder.query({
            query: () => `/api/faqs/view-all`,
            invalidatesTags: ["FAQs"]
        }),
        createFAQ: builder.mutation({
            query: (newFAQ) => ({
                url: `/api/faqs/create`,
                method: "POST",
                body: newFAQ
            }),
            invalidatesTags: [{type: "FAQ", id: "LIST"}]
        }),
        updateFAQ: builder.mutation({
            query: ({id, ...updatedData}) => ({
                url: `/api/faqs/update/${id}`,
                method: "PATCH",
                body: updatedData
            }),
            invalidatesTags: [{type: "FAQ", id: "LIST"}]
        }),
        deleteFAQ: builder.mutation({
            query: (id) => ({
                url: `/api/faqs/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "FAQ", id: "LIST"}]
        }),
        // services endpoints
        getService: builder.query({
            query: (id) => `/api/services/view/${id}`,
            providesTags: ["Service"]
        }),
        getAllServices: builder.query({
            query: () => `/api/services/view-all`,
            invalidatesTags: ["Services"]
        }),
        createService: builder.mutation({
            query: (newService) => ({
                url: `/api/services/create`,
                method: "POST",
                body: newService
            }),
            invalidatesTags: [{type: "Service", id: "LIST"}]
        }),
        updateService: builder.mutation({
            query: ({id, ...updatedData}) => ({
                url: `/api/services/update/${id}`,
                method: "PATCH",
                body: updatedData
            }),
            invalidatesTags: [{type: "Service", id: "LIST"}]
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/api/services/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [{type: "Service", id: "LIST"}]
        }),
    })

})

export const {
    useGetFAQQuery,
    useGetAllFAQSQuery,
    useCreateFAQMutation,
    useUpdateFAQMutation,
    useDeleteFAQMutation,
    useGetServiceQuery,
    useGetAllServicesQuery,
    useCreateServiceMutation,
    useUpdateServiceMutation,
    useDeleteServiceMutation
} = Api