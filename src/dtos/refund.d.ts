type RefundAPIResponse = {
   id: string
   userId: string
   name: string
   category: CategoriesAPI
   amount: number
   filename: string
   user: {
      name: string
   }
}

type PaginationAPIResponse = {
   refunds: RefundAPIResponse[]
   pagination: {
      page: number
      perPage: number
      totalRecords: number
      totalPages: number
   }
}