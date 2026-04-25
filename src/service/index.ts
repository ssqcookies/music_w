import SRequest from "./request";
import { BASE_URL,TIME_OUT} from './config'

const sRequest = new SRequest({
  baseURL:BASE_URL,
  timeout:TIME_OUT
})

export default sRequest