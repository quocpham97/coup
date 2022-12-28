import axios from 'axios'
import { IProduct } from 'types'

export interface IResponseData {
  product: IProduct
  success: boolean
}

export const getProduct = async (id: string): Promise<IProduct> => {
  try {
    return await axios.post<IResponseData>(`/api/product`, { id }).then((res) => res.data.product)
  } catch (error) {
    return Promise.reject(error)
  }
}
